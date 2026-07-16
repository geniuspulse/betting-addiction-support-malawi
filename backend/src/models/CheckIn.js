const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CheckIn = sequelize.define('CheckIn', {
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
  bettedToday: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'betted_today',
  },
  urgeStrength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'urge_strength',
    validate: {
      min: 1,
      max: 10,
    },
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'check_in_date',
  },
});

module.exports = CheckIn;
