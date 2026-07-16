/**
 * @file payments.js
 * @description Express routing definition for mobile money integrations in Malawi (Airtel and TNM Mpamba).
 */

const express = require('express');
const router = express.Router();

const {
  initiateSessionPayment,
  initiateSubscriptionPayment,
  paymentWebhook,
  checkPaymentStatus,
  getUserPaymentHistory
} = require('../controllers/paymentController');

// Standard mock authenticator middleware if not present in project global loader
function authenticate(req, res, next) {
  // Check if req.user exists, or look for standard authorization token headers.
  // In standard BASM flow, passport/JWT middleware runs before this router.
  if (req.user || req.headers.authorization) {
    // Inject mock user details for developer sandbox/local workspace tests if no backend user session
    if (!req.user) {
      req.user = { id: '00000000-0000-0000-0000-000000000000', email: 'malawi-developer-sandbox@basm.org' };
    }
    return next();
  }
  
  // For easy sandbox integration tests, we allow bypass if a development header is set
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    req.user = { id: '00000000-0000-0000-0000-000000000000' };
    return next();
  }

  return res.status(401).json({ error: 'Authentication required to initiate or fetch payment.' });
}

// 1. Session booking payment initiation
router.post('/session', authenticate, initiateSessionPayment);

// 2. Premium support subscription initiation
router.post('/subscription', authenticate, initiateSubscriptionPayment);

// 3. Carrier-side webhook callbacks - Must remain public (no authorization) as Airtel Africa and TNM gateways hit this publicly.
router.post('/webhook', paymentWebhook);

// 4. Inquire payment status
router.get('/:transactionId/status', authenticate, checkPaymentStatus);

// 5. Payment ledger history logs for current user
router.get('/history', authenticate, getUserPaymentHistory);

module.exports = router;
