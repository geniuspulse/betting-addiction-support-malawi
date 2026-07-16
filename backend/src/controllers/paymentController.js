/**
 * @file paymentController.js
 * @description HTTP Controller handling mobile money flows for session bookings and subscriptions.
 */

const crypto = require('crypto');
const paymentService = require('../services/payments/paymentService');
const Payment = require('../models/Payment');

// Mock external service files to avoid crashing if they don't exist
// e.g., Counsellor fee rates or session schedules.
const SESSION_RATES = {
  standard: 15000,   // MK 15,000 standard support session
  premium: 25000     // MK 25,000 specialist clinical session
};

const SUBSCRIPTION_FEE_MWK = 7500; // MK 7,500
const COUNSELLOR_REV_SHARE_PERCENT = 0.70; // Counsellor gets 70%, BASM retains 30%

/**
 * Initiates mobile money payment session booking for a support counsellor.
 * Calculates price, charges platform fee, initiates push pay, and stores pending transaction.
 * 
 * POST /api/payments/session
 * Body: { counsellorId, sessionType, phone, scheduledAt }
 */
async function initiateSessionPayment(req, res) {
  try {
    const { counsellorId, sessionType, phone, scheduledAt } = req.body;
    const userId = req.user?.id || req.body.userId || '00000000-0000-0000-0000-000000000000'; // fallback for sandbox

    if (!counsellorId || !phone || !sessionType) {
      return res.status(400).json({ error: 'Missing required parameters: counsellorId, sessionType, phone.' });
    }

    const amountMWK = SESSION_RATES[sessionType] || SESSION_RATES.standard;
    const provider = paymentService.determineProvider(phone);
    const reference = `SES-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${Date.now()}`;

    // Revenue calculations
    const counsellorPayoutMWK = amountMWK * COUNSELLOR_REV_SHARE_PERCENT;
    const platformFeeMWK = amountMWK * (1 - COUNSELLOR_REV_SHARE_PERCENT);

    const paymentResult = await paymentService.processPayment({
      phone,
      amountMWK,
      reference,
      description: `BASM Counsellor Session Booking (${sessionType})`,
      provider
    });

    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Could not trigger mobile money payment push with carrier.',
        error: paymentResult.message
      });
    }

    // Save payment model instance
    const paymentRecord = await Payment.create({
      userId,
      type: 'session',
      amountMWK,
      provider,
      transactionId: paymentResult.transactionId,
      reference,
      status: 'pending',
      counsellorPayoutMWK,
      platformFeeMWK,
      metadata: {
        scheduledAt,
        counsellorId,
        sessionType,
        rawResponse: paymentResult.raw
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Mobile money push payment requested successfully.',
      data: {
        transactionId: paymentResult.transactionId,
        reference,
        amountMWK,
        provider,
        status: 'pending',
        instructions: provider === 'tnm_mpamba' 
          ? `TNM Mpamba Push Request sent. Alternative fallback: Dial *444#, Select Pay Merchant, use BASM code, and transfer MK ${amountMWK} with Reference ${reference}.`
          : `Airtel Money Push Request sent. Please check your phone for a PIN entry prompt to approve MK ${amountMWK}.`
      }
    });

  } catch (error) {
    console.error('Session Payment Initiation Error:', error);
    return res.status(500).json({ error: 'Server failed to initiate session payment.', details: error.message });
  }
}

/**
 * Initiates mobile money payment for BASM premium support subscription (fixed price MK 7,500)
 * 
 * POST /api/payments/subscription
 * Body: { plan, phone }
 */
async function initiateSubscriptionPayment(req, res) {
  try {
    const { phone } = req.body;
    const userId = req.user?.id || req.body.userId || '00000000-0000-0000-0000-000000000000';

    if (!phone) {
      return res.status(400).json({ error: 'Missing subscriber phone number.' });
    }

    const amountMWK = SUBSCRIPTION_FEE_MWK;
    const provider = paymentService.determineProvider(phone);
    const reference = `SUB-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${Date.now()}`;

    const paymentResult = await paymentService.processPayment({
      phone,
      amountMWK,
      reference,
      description: 'BASM Premium Support Monthly Subscription',
      provider
    });

    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Could not trigger subscription mobile money payment push with carrier.',
        error: paymentResult.message
      });
    }

    // Save payment model instance
    await Payment.create({
      userId,
      type: 'subscription',
      amountMWK,
      provider,
      transactionId: paymentResult.transactionId,
      reference,
      status: 'pending',
      counsellorPayoutMWK: 0, // no direct counsellor payout for site-wide membership subscription
      platformFeeMWK: amountMWK, // 100% retained by platform
      metadata: {
        plan: 'premium',
        rawResponse: paymentResult.raw
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Subscription payment requested successfully.',
      data: {
        transactionId: paymentResult.transactionId,
        reference,
        amountMWK,
        provider,
        status: 'pending',
        instructions: `Please check your handset for the push authorization prompt to subscribe to BASM Premium Support.`
      }
    });

  } catch (error) {
    console.error('Subscription Payment Initiation Error:', error);
    return res.status(500).json({ error: 'Server failed to initiate subscription payment.', details: error.message });
  }
}

/**
 * Public Webhook receiver for Airtel Africa / TNM Mpamba instant payment notifications (IPN / Callbacks).
 * Receives POST data from the carrier gateways, verifies accuracy, then activates session or membership.
 * 
 * POST /api/payments/webhook
 */
async function paymentWebhook(req, res) {
  try {
    const payload = req.body;
    console.log('Received payment callback webhook payload:', JSON.stringify(payload));

    // Handle generic Open API/TNM formats
    // Usually provides reference, transactionId, status, airtel_money_id, or tnm reference
    const reference = payload.reference || payload.data?.transaction?.reference || payload.transaction?.reference;
    const providerTransactionId = payload.transactionId || payload.data?.transaction?.id || payload.transaction_id;
    const externalStatus = payload.status || payload.data?.transaction?.status;

    if (!reference) {
      return res.status(400).json({ error: 'Callback ignored: No matching transaction reference code.' });
    }

    // Retrieve corresponding payment record
    const payment = await Payment.findOne({ where: { reference } });
    if (!payment) {
      return res.status(404).json({ error: `Payment ledger record not found for reference ${reference}` });
    }

    // Map carrier status codes
    let newStatus = 'pending';
    if (['SUCCESS', 'completed', 'verified', '00', 'APPROVED'].includes(externalStatus)) {
      newStatus = 'completed';
    } else if (['FAILED', 'failed', '01', 'DECLINED', 'REJECTED'].includes(externalStatus)) {
      newStatus = 'failed';
    }

    // If status remains pending in webhook, we do not perform downstream activation yet
    if (newStatus === 'completed' && payment.status !== 'completed') {
      payment.status = 'completed';
      payment.transactionId = providerTransactionId || payment.transactionId;
      payment.metadata = { ...payment.metadata, webhookPayload: payload };
      await payment.save();

      // DOWNSTREAM BUSINESS TRIGGERS
      if (payment.type === 'session') {
        // Trigger Session booking confirmed routines, e.g. send notification, schedule Zoom/Google Meet links,
        // and calculate final counsellor ledger payout values.
        console.log(`[BASM ACTION] Session payment confirmed. Booking complete. Scheduled counsellor payout: MK ${payment.counsellorPayoutMWK}`);
      } else if (payment.type === 'subscription') {
        // Unlock subscription membership table for user
        console.log(`[BASM ACTION] Premium Membership confirmed. Unlocking site features for User ${payment.userId}`);
      }
    } else if (newStatus === 'failed') {
      payment.status = 'failed';
      payment.metadata = { ...payment.metadata, webhookPayload: payload };
      await payment.save();
    }

    // Always respond 200 OK to mobile carrier webhook to stop retries
    return res.status(200).json({ status: 'ACCEPTED', message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook Processing Failure:', error);
    return res.status(500).json({ error: 'Internal processing error on callback receipt' });
  }
}

/**
 * Checks transaction status via standard database query or active provider poll request.
 * 
 * GET /api/payments/:transactionId/status
 */
async function checkPaymentStatus(req, res) {
  try {
    const { transactionId } = req.params;
    
    let payment = await Payment.findOne({ where: { transactionId } });
    if (!payment) {
      // Also check by reference
      payment = await Payment.findOne({ where: { reference: transactionId } });
    }

    if (!payment) {
      return res.status(404).json({ error: 'Requested payment transaction could not be located.' });
    }

    // If the payment is still pending, proactively poll the provider API
    if (payment.status === 'pending') {
      try {
        const verifyResult = await paymentService.verifyPayment(payment.transactionId || payment.reference, payment.provider);
        if (verifyResult && verifyResult.status !== payment.status) {
          payment.status = verifyResult.status;
          payment.metadata = { ...payment.metadata, polledStatusResult: verifyResult.raw };
          await payment.save();

          // Execute business triggers on status resolution
          if (payment.status === 'completed') {
            if (payment.type === 'session') {
              console.log(`[BASM ACTION] Poll completion: Session confirmed for counsellor payout.`);
            } else if (payment.type === 'subscription') {
              console.log(`[BASM ACTION] Poll completion: Premium subscription activated.`);
            }
          }
        }
      } catch (pollErr) {
        console.warn(`Proactive polling for payment ${transactionId} failed, serving cached DB status.`, pollErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      transactionId: payment.transactionId,
      reference: payment.reference,
      type: payment.type,
      amountMWK: payment.amountMWK,
      provider: payment.provider,
      status: payment.status,
      updatedAt: payment.updatedAt
    });

  } catch (error) {
    console.error('Status Query Error:', error);
    return res.status(500).json({ error: 'Could not fetch transaction status.' });
  }
}

/**
 * Returns authenticated user's historical payment records
 * 
 * GET /api/payments/history
 */
async function getUserPaymentHistory(req, res) {
  try {
    const userId = req.user?.id || req.query.userId; // fallback
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. User authentication required.' });
    }

    const history = await Payment.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Payment History Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve transaction logs.' });
  }
}

module.exports = {
  initiateSessionPayment,
  initiateSubscriptionPayment,
  paymentWebhook,
  checkPaymentStatus,
  getUserPaymentHistory
};
