const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/setup', walletController.setupWallet);
router.get('/summary', walletController.getWalletSummary);

module.exports = router;
