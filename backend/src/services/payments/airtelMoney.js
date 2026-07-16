/**
 * @file airtelMoney.js
 * @description Airtel Money API integration for Malawi (Airtel Africa Open API).
 * Handles authentication (OAuth2 with caching), payment initiation, status verification, and refunds.
 */

const axios = require('axios');

const BASE_URL = process.env.AIRTEL_MONEY_BASE_URL || 'https://openapi.airtel.africa';
const CLIENT_ID = process.env.AIRTEL_MONEY_CLIENT_ID;
const CLIENT_SECRET = process.env.AIRTEL_MONEY_CLIENT_SECRET;
const AIRTEL_PIN = process.env.AIRTEL_MONEY_PIN; // For decryption/signing if required by specific endpoints

// Simple in-memory token cache
let tokenCache = {
  accessToken: null,
  expiresAt: null
};

/**
 * Normalizes Malawian phone numbers to Airtel country format (265XXXXXXXXX or 9XXXXXXXXX / 8XXXXXXXXX based on standard)
 * Specifically, Airtel Malawi requests might require either country code prefix or national format.
 * Here we normalize to '265' followed by 9 digits as specified: 265XXXXXXXXX.
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
 * Obtains an OAuth2 access token from Airtel Africa API.
 * Uses in-memory caching to avoid redundant authentications.
 * 
 * @returns {Promise<string>} The access token
 */
async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.accessToken && tokenCache.expiresAt && now < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Airtel Money API credentials are not configured in environment variables.');
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/oauth2/token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      timeout: 10000
    });

    const { access_token, expires_in } = response.data;
    if (!access_token) {
      throw new Error('Failed to retrieve access token from response.');
    }

    tokenCache = {
      accessToken: access_token,
      // Cache with a 60-second safety buffer
      expiresAt: now + (parseInt(expires_in, 10) - 60) * 1000
    };

    return tokenCache.accessToken;
  } catch (error) {
    const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error('Error fetching Airtel Money OAuth2 token:', errorDetails);
    throw new Error(`Airtel Auth Failure: ${error.message}`);
  }
}

/**
 * Initiates a push payment transaction (C2B / Merchant payment request)
 * 
 * @param {Object} params - Payment initiation options
 * @param {string} params.phone - Customer mobile number (Airtel Malawi prefix 099, 098, 097)
 * @param {number} params.amount - Transaction amount in MWK
 * @param {string} params.reference - Unique internal reference/order identifier
 * @param {string} params.description - Brief purpose of payment
 * @returns {Promise<{transactionId: string, status: string, raw: Object}>} Normalized provider response
 */
async function initiatePayment({ phone, amount, reference, description }) {
  const formattedPhone = normalizePhone(phone);
  
  if (!/^265(99|98|97)\d{7}$/.test(formattedPhone)) {
    throw new Error('Invalid Airtel Malawi phone number format. Must start with 26599, 26598, or 26597 followed by 7 digits.');
  }

  if (amount <= 0) {
    throw new Error('Payment amount must be greater than zero.');
  }

  try {
    const token = await getAccessToken();
    
    const payload = {
      reference: reference,
      subscriber: {
        country: 'MW',
        currency: 'MWK',
        msisdn: formattedPhone.substring(3) // Typically Airtel Africa requires MSISDN without country code if country code is separate, or full depending on context. Under the Open API v1 standard, the msisdn is usually national number or full. We pass standard payload.
      },
      transaction: {
        amount: amount,
        country: 'MW',
        currency: 'MWK',
        id: reference
      }
    };

    const response = await axios.post(`${BASE_URL}/merchant/v1/payments`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'X-Country': 'MW',
        'X-Currency': 'MWK'
      },
      timeout: 15000
    });

    const data = response.data;
    
    // Process typical Airtel response structures
    // status: { response_code: "DP00900001001", success: true, message: "Accepted" }
    // data: { transaction: { id: "..." } }
    if (data && data.status && data.status.success) {
      return {
        transactionId: data.data?.transaction?.id || reference,
        status: 'pending',
        raw: data
      };
    } else {
      const msg = data?.status?.message || 'Transaction was rejected by Airtel';
      throw new Error(`Airtel Payment Rejected: ${msg}`);
    }

  } catch (error) {
    const responseData = error.response?.data;
    if (responseData && responseData.status) {
      const code = responseData.status.code;
      const message = responseData.status.message;
      if (code === 'DP00900001002') {
        throw new Error('Airtel Payment Error: Insufficient funds in customer wallet.');
      } else if (code === 'DP00900001006') {
        throw new Error('Airtel Payment Error: Invalid subscriber number.');
      } else {
        throw new Error(`Airtel Payment Error: ${message || 'Unknown provider rejection'}`);
      }
    }
    throw new Error(`Airtel Network/API Error: ${error.message}`);
  }
}

/**
 * Checks status of an initiated Airtel Money payment
 * 
 * @param {string} transactionId - The vendor transaction reference ID
 * @returns {Promise<{status: string, raw: Object}>} Normalized status response
 */
async function checkPaymentStatus(transactionId) {
  if (!transactionId) {
    throw new Error('A transaction ID is required to fetch payment status.');
  }

  try {
    const token = await getAccessToken();

    const response = await axios.get(`${BASE_URL}/standard/v1/payments/${transactionId}`, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'X-Country': 'MW',
        'X-Currency': 'MWK'
      },
      timeout: 10000
    });

    const data = response.data;
    // Map Airtel statuses to standardized BASM statuses ('pending', 'completed', 'failed')
    let standardStatus = 'pending';
    
    if (data && data.data && data.data.transaction) {
      const airtelStatus = data.data.transaction.status;
      if (airtelStatus === 'SUCCESS') {
        standardStatus = 'completed';
      } else if (airtelStatus === 'FAILED') {
        standardStatus = 'failed';
      }
    }

    return {
      status: standardStatus,
      raw: data
    };
  } catch (error) {
    const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error(`Error checking status for Airtel tx ${transactionId}:`, errorDetails);
    throw new Error(`Airtel Status Check Failure: ${error.message}`);
  }
}

/**
 * Initiates a refund for an existing successful transaction
 * 
 * @param {string} transactionId - The original transaction ID
 * @param {number} amount - Amount to refund in MWK
 * @returns {Promise<{refundId: string, status: string, raw: Object}>} Normalized refund details
 */
async function initiateRefund(transactionId, amount) {
  if (!transactionId || !amount) {
    throw new Error('Transaction ID and refund amount are required.');
  }

  try {
    const token = await getAccessToken();

    const payload = {
      transaction: {
        airtel_money_id: transactionId,
        amount: amount
      }
    };

    const response = await axios.post(`${BASE_URL}/standard/v1/payments/refund`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'X-Country': 'MW',
        'X-Currency': 'MWK'
      },
      timeout: 15000
    });

    const data = response.data;
    let refundStatus = 'pending';
    if (data && data.status && data.status.success) {
      refundStatus = 'completed'; // or pending if processed asynchronously
    }

    return {
      refundId: data?.data?.transaction?.id || `ref-${Date.now()}`,
      status: refundStatus,
      raw: data
    };
  } catch (error) {
    const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error(`Error initiating Airtel refund for tx ${transactionId}:`, errorDetails);
    throw new Error(`Airtel Refund Failure: ${error.message}`);
  }
}

module.exports = {
  getAccessToken,
  initiatePayment,
  checkPaymentStatus,
  initiateRefund
};
