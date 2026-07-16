const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['created_at', 'DESC']],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, category } = req.body;

    if (!content || !category) {
      return res.status(400).json({ error: 'Content and category are required' });
    }

    const post = await Post.create({
      content,
      category,
      likes: 0,
      isAnonymous: true,
    });

    return res.status(201).json({
      message: 'Post created anonymously!',
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    return res.status(200).json({
      message: 'Post liked successfully!',
      likes: post.likes,
    });
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const challenges = {
      daily: {
        title: 'Lero Sinditchova (Today I will not bet)',
        description: 'Declare this affirmation in the morning. When you feel an urge, write down 3 alternative uses for that money.',
        bilingual: 'Today, I choose peace and recovery. Ndasankha mtendere komanso kudziyimira pawokha.',
      },
      weekly: {
        title: 'Weekly Wallet Boost',
        description: 'Complete 5 daily check-ins this week and divert your planned gambling money into your Recovery Wallet.',
        goal: 'Aim to reach the price equivalent of 1 Bag of Maize (MK35,000) or 1 Term of School Fees (MK45,000) saved this week.',
      }
    };

    return res.status(200).json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
