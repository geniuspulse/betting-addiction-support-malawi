const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.get('/posts', communityController.getPosts);
router.post('/posts', communityController.createPost);
router.post('/posts/:id/like', communityController.likePost);
router.get('/challenges', communityController.getChallenges);

module.exports = router;
