const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getDashboard } = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/dashboard', authenticate, getDashboard);

module.exports = router;
