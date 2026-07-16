const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UrgeLog = sequelize.define('UrgeLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
  },
  intensity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  trigger: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  outcome: {
    type: DataTypes.ENUM('resisted', 'relapsed'),
    allowNull: false,
  },
});

module.exports = UrgeLog;
