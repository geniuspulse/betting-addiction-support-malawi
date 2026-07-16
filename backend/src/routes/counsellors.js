const express = require('express');
const router = express.Router();
const { getCounsellors, getCounsellor, bookSession } = require('../controllers/counsellorsController');
const { authenticate } = require('../middleware/auth');

router.get('/', getCounsellors);
router.get('/:id', getCounsellor);
router.post('/:id/book', authenticate, bookSession);

module.exports = router;
