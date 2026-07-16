const express = require('express');
const router = express.Router();
const achievementsController = require('../controllers/achievementsController');

router.get('/', achievementsController.getAchievements);
router.post('/check', achievementsController.checkAchievements);

module.exports = router;
