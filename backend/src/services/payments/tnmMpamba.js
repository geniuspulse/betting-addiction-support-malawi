/**
 * @file tnmMpamba.js
 * @description TNM Mpamba mobile money integration stub for Malawi.
 * Implements the unified payment integration interface.
 * 
 * NOTE: The TNM Mpamba official integration API is currently closed/custom-request.
 * This is a fully functional simulation stub that allows the application flow to be tested,
 * and contains complete USSD instruction fallbacks for real manual verification.
 */

/**
 * Normalizes Malawian phone numbers to TNM country format (265XXXXXXXXX)
 * 
 * @param {string} phone - Input phone number
 * @returns {string} Normalized phone number
 */
function normalizePhone(phone) {
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('265')) {
    return clean;
  }
  if (clean.startsWith('0')) {
    return `265${clean.slice(1)}`;
  }
  return `265${clean}`;
}

/**
 * Initiates a push payment transaction (C2B / Mpamba request)
 * Simulation mode: returns a success push pending status and includes 
 * detailed USSD manual payment directions for Malawi users.
 * 
 * USSD FALLBACK DIAL SEQUENCE:
 * Users can manually trigger the payment by dialing:
 * *444# -> Pay Merchant (Select option) -> Enter Merchant Code -> Enter Amount -> Enter PIN
 * 
 * @param {Object} params - Payment initiation options
 * @param {string} params.phone - Customer mobile number (TNM Malawi prefix 088, 089)
 * @param {number} params.amount - Transaction amount in MWK
 * @param {string} params.reference - Unique internal reference/order identifier
 * @param {string} params.description - Brief purpose of payment
 * @returns {Promise<{transactionId: string, status: string, message: string, ussdFallback: string, raw: Object}>} Normalized response
 */
async function initiatePayment({ phone, amount, reference, description }) {
  const formattedPhone = normalizePhone(phone);

  if (!/^265(88|89)\d{7}$/.test(formattedPhone)) {
    throw new Error('Invalid TNM Mpamba phone number format. Must start with 26588 or 26589 followed by 7 digits.');
  }

  if (amount <= 0) {
    throw new Error('Payment amount must be greater than zero.');
  }

  // Simulated Processing
  console.log(`[TNM Mpamba] Simulating push payment to ${formattedPhone} for MK ${amount}`);

  const transactionId = `TNM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const ussdInstruction = `Dial *444# on your TNM Mpamba line -> Choose 'Pay Merchant' -> Enter BASM Merchant ID -> Enter Amount MK ${amount} -> Enter Reference ${reference} -> Enter Mpamba PIN.`;

  return {
    transactionId,
    status: 'pending',
    message: 'TNM Mpamba API is currently operating in simulation/USSD-fallback mode.',
    ussdFallback: ussdInstruction,
    raw: {
      provider: 'tnm_mpamba',
      simulated: true,
      timestamp: new Date().toISOString(),
      details: 'Pending push payment simulated. Manual USSD transaction receipt can also be verified.'
    }
  };
}

/**
 * Checks status of an initiated TNM Mpamba transaction.
 * In stub/sandbox mode, payments auto-resolve to 'completed' for testing purposes.
 * 
 * @param {string} transactionId - The transaction ID
 * @returns {Promise<{status: string, raw: Object}>} Status of the payment
 */
async function checkPaymentStatus(transactionId) {
  if (!transactionId) {
    throw new Error('Transaction ID is required to fetch TNM Mpamba payment status.');
  }

  // Simulate auto-completing simulated transactions for end-to-end sandbox UX flow
  return {
    status: 'completed',
    raw: {
      transactionId,
      provider: 'tnm_mpamba',
      simulated: true,
      verificationTime: new Date().toISOString()
    }
  };
}

/**
 * Initiates refund for TNM Mpamba transaction
 * 
 * @param {string} transactionId - Original transaction ID
 * @param {number} amount - Refund amount
 * @returns {Promise<{refundId: string, status: string, raw: Object}>} Refund details
 */
async function initiateRefund(transactionId, amount) {
  if (!transactionId || !amount) {
    throw new Error('Transaction ID and refund amount are required.');
  }

  return {
    refundId: `REF-${transactionId}`,
    status: 'refunded',
    raw: {
      transactionId,
      amount,
      provider: 'tnm_mpamba',
      simulated: true,
      refundTime: new Date().toISOString()
    }
  };
}

module.exports = {
  initiatePayment,
  checkPaymentStatus,
  initiateRefund
};
