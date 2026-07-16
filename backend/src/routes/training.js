const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.get('/programs', trainingController.getPrograms);
router.get('/programs/:id', trainingController.getProgramById);
router.post('/enroll/:id', trainingController.enrollInProgram);
router.get('/progress', trainingController.getProgress);

module.exports = router;
