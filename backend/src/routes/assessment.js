const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/submit', assessmentController.submitAssessment);
router.get('/history', assessmentController.getAssessmentHistory);

module.exports = router;
