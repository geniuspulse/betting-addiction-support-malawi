const express = require('express');
const router = express.Router();
const { submitAssessment, getRecommendation } = require('../controllers/assessmentsController');
const { authenticate } = require('../middleware/auth');

router.post('/submit', authenticate, submitAssessment);
router.get('/recommendation', authenticate, getRecommendation);

module.exports = router;
