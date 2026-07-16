const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('story', 'question', 'encouragement', 'milestone'),
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_anonymous',
  },
});

module.exports = Post;
