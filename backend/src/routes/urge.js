const express = require('express');
const router = express.Router();
const urgeController = require('../controllers/urgeController');

router.post('/log', urgeController.logUrge);
router.get('/exercises', urgeController.getUrgeExercises);
router.get('/motivational', urgeController.getMotivationalMessage);

module.exports = router;
