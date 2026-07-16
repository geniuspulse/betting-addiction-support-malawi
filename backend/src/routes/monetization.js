const express = require('express');
const router = express.Router();
const {
  applyAsCounsellor,
  getCounsellorProfile,
  updateAvailability,
  getSessionPricing,
  bookSession,
  getSubscriptionPlans,
  subscribeToPremium,
  getCounsellorEarnings,
  requestPayout,
} = require('../controllers/counsellorMonetizationController');
const { authenticate } = require('../middleware/auth');

// Counsellor onboarding
router.post('/counsellors/apply', applyAsCounsellor);
router.get('/counsellors/:id/profile', authenticate, getCounsellorProfile);
router.put('/counsellors/:id/availability', authenticate, updateAvailability);
router.get('/counsellors/:id/earnings', authenticate, getCounsellorEarnings);
router.post('/counsellors/:id/payout', authenticate, requestPayout);

// Sessions
router.get('/sessions/pricing', getSessionPricing);
router.post('/sessions/book', authenticate, bookSession);

// Subscriptions
router.get('/subscriptions/plans', getSubscriptionPlans);
router.post('/subscriptions/premium', authenticate, subscribeToPremium);

module.exports = router;
