const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/contacts', emergencyController.getEmergencyContacts);
router.get('/exercises', emergencyController.getEmergencyExercises);
router.post('/trigger', emergencyController.triggerEmergency);

module.exports = router;
