const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.get('/daily-message', aiController.getDailyMessage);
router.post('/chat', aiController.chatStub);
router.get('/weekly-summary', aiController.getWeeklySummary);

module.exports = router;
