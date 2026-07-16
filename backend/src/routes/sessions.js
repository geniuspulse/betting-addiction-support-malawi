const express = require('express');
const router = express.Router();
const { getSessions, getSession, updateSession } = require('../controllers/sessionsController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getSessions);
router.get('/:id', authenticate, getSession);
router.put('/:id', authenticate, updateSession);

module.exports = router;
