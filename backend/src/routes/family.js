const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.get('/resources', familyController.getFamilyResources);

module.exports = router;
