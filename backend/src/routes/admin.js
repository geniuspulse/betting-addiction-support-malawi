const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// PUBLIC ADMIN ROUTES
router.post('/login', adminController.adminLogin);

// PROTECTED ADMIN ROUTES (Require verified admin role token)
router.use(adminAuth);

router.get('/dashboard', adminController.getDashboardStats);

// Counsellor Operations
router.get('/counsellors', adminController.getCounsellors);
router.post('/counsellors/:id/approve', adminController.approveCounsellor);
router.post('/counsellors/:id/suspend', adminController.suspendCounsellor);

// User Operations
router.get('/users', adminController.getUsers);
router.post('/users/:id/suspend', adminController.suspendUser);

// Booking & Revenue Operations
router.get('/sessions', adminController.getSessions);
router.get('/revenue', adminController.getRevenueReport);
router.post('/payouts/:counsellorId', adminController.processPayout);

// Forums & Moderation Operations
router.get('/community', adminController.getCommunityPosts);
router.post('/community/:postId/approve', adminController.approveCommunityPost);
router.delete('/community/:postId', adminController.removePost);

module.exports = router;
