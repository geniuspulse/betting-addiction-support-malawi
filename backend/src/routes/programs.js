const express = require('express');
const router = express.Router();
const { getPrograms, getProgram, enrollUser, getUserProgress } = require('../controllers/programsController');
const { authenticate } = require('../middleware/auth');

router.get('/', getPrograms);
router.get('/:id', getProgram);
router.post('/:id/enroll', authenticate, enrollUser);
router.get('/:id/progress', authenticate, getUserProgress);

module.exports = router;
