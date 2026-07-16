/**
 * @file paymentService.js
 * @description Unified Payment Service for Betting Addiction Support Malawi (BASM).
 * Dynamically routes transactions to Airtel Money or TNM Mpamba depending on Malawian phone prefixes,
 * processes payments, verifies statuses, initiates refunds, and persists payment records to database.
 */

const airtelMoney = require('./airtelMoney');
const tnmMpamba = require('./tnmMpamba');
const Payment = require('../../models/Payment');

/**
 * Detects the network provider based on Malawi phone number prefixes.
 * Airtel Malawi prefixes: 099, 098, 097 (or 26599, 26598, 26597)
 * TNM Mpamba prefixes: 088, 089 (or 26588, 26589)
 * 
 * @param {string} phone - Input phone number
 * @returns {'airtel_money' | 'tnm_mpamba'} Provider key
 * @throws {Error} If prefix does not match supported Malawian mobile wallets
 */
function determineProvider(phone) {
  const clean = phone.replace(/\D/g, '');
  
  // Extract trailing 9 digits (Malawi mobile number length is 9 digits, e.g. 99XXXXXXX or 88XXXXXXX)
  const nationalNumber = clean.length >= 9 ? clean.slice(-9) : clean;
  
  if (/^(99|98|97)/.test(nationalNumber)) {
    return 'airtel_money';
  } else if (/^(88|89)/.test(nationalNumber)) {
    return 'tnm_mpamba';
  } else {
    throw new Error('Unsupported phone carrier prefix. Phone must belong to Airtel (099, 098, 097) or TNM (088, 089).');
  }
}

/**
 * Routes and processes a push payment transaction for mobile money
 * 
 * @param {Object} params - Process payment options
 * @param {string} params.phone - Customer phone number
 * @param {number} params.amountMWK - Payment amount in Malawian Kwacha (MWK)
 * @param {string} params.reference - Unique order reference identifier
 * @param {string} params.description - Purpose description
 * @param {'airtel_money' | 'tnm_mpamba'} [params.provider] - Optional explicit provider choice
 * @returns {Promise<{success: boolean, transactionId: string, status: string, message: string, provider: string, raw: Object}>} Normalized unified service response
 */
async function processPayment({ phone, amountMWK, reference, description, provider }) {
  try {
    const activeProvider = provider || determineProvider(phone);
    let result;

    if (activeProvider === 'airtel_money') {
      result = await airtelMoney.initiatePayment({
        phone,
        amount: amountMWK,
        reference,
        description
      });
    } else if (activeProvider === 'tnm_mpamba') {
      result = await tnmMpamba.initiatePayment({
        phone,
        amount: amountMWK,
        reference,
        description
      });
    } else {
      throw new Error(`Invalid provider requested: ${provider}`);
    }

    return {
      success: true,
      transactionId: result.transactionId,
      status: result.status,
      message: result.message || 'Payment initiated successfully.',
      provider: activeProvider,
      raw: result.raw
    };
  } catch (error) {
    return {
      success: false,
      transactionId: null,
      status: 'failed',
      message: error.message,
      provider: provider || 'unknown',
      raw: null
    };
  }
}

/**
 * Checks transaction status with the provider
 * 
 * @param {string} transactionId - The transaction reference
 * @param {'airtel_money' | 'tnm_mpamba'} provider - Payment provider
 * @returns {Promise<{status: string, raw: Object}>} Normalized status output
 */
async function verifyPayment(transactionId, provider) {
  if (provider === 'airtel_money') {
    return await airtelMoney.checkPaymentStatus(transactionId);
  } else if (provider === 'tnm_mpamba') {
    return await tnmMpamba.checkPaymentStatus(transactionId);
  } else {
    throw new Error('Unsupported payment provider for verification.');
  }
}

/**
 * Requests refund from the respective provider
 * 
 * @param {string} transactionId - The transaction to refund
 * @param {number} amountMWK - Amount in MWK
 * @param {'airtel_money' | 'tnm_mpamba'} provider - Payment provider
 * @returns {Promise<{success: boolean, refundId: string, status: string, raw: Object}>} Normalized refund response
 */
async function processRefund(transactionId, amountMWK, provider) {
  try {
    let result;
    if (provider === 'airtel_money') {
      result = await airtelMoney.initiateRefund(transactionId, amountMWK);
    } else if (provider === 'tnm_mpamba') {
      result = await tnmMpamba.initiateRefund(transactionId, amountMWK);
    } else {
      throw new Error('Unsupported payment provider for refund.');
    }

    return {
      success: true,
      refundId: result.refundId,
      status: result.status,
      raw: result.raw
    };
  } catch (error) {
    return {
      success: false,
      refundId: null,
      status: 'failed',
      message: error.message,
      raw: null
    };
  }
}

/**
 * Saves a new payment record or ledger log in the database
 * 
 * @param {Object} params - Record parameters
 * @param {string} params.userId - DB User ID
 * @param {'session' | 'subscription' | 'refund'} params.type - Payment categorization
 * @param {number} params.amountMWK - Gross amount transacted
 * @param {'airtel_money' | 'tnm_mpamba'} params.provider - The carrier provider
 * @param {string} params.transactionId - Vendor trans ID
 * @param {string} params.reference - Internal reference code
 * @param {'pending' | 'completed' | 'failed' | 'refunded'} [params.status] - Initial status
 * @param {number} [params.counsellorPayoutMWK] - Counsellor revenue share allocation (if session)
 * @param {number} [params.platformFeeMWK] - BASM operational service fee
 * @param {Object} [params.metadata] - Raw metadata payloads
 * @returns {Promise<Object>} Sequelize Payment Model Instance
 */
async function createPaymentRecord({
  userId,
  type,
  amountMWK,
  provider,
  transactionId,
  reference,
  status = 'pending',
  counsellorPayoutMWK = 0,
  platformFeeMWK = 0,
  metadata = {}
}) {
  return await Payment.create({
    userId,
    type,
    amountMWK,
    provider,
    transactionId,
    reference,
    status,
    counsellorPayoutMWK,
    platformFeeMWK,
    metadata
  });
}

module.exports = {
  determineProvider,
  processPayment,
  verifyPayment,
  processRefund,
  createPaymentRecord
};
