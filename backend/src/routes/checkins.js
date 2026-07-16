const express = require('express');
const router = express.Router();
const checkinsController = require('../controllers/checkinsController');

router.post('/', checkinsController.createCheckIn);
router.get('/history', checkinsController.getCheckInHistory);
router.get('/streak', checkinsController.getStreak);

module.exports = router;
