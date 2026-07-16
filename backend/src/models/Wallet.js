const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'user_id',
  },
  dailyBetAmount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'daily_bet_amount',
  },
  savingsGoalLabel: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'General Savings',
    field: 'savings_goal_label',
  },
  savingsGoalTarget: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'savings_goal_target',
  },
});

module.exports = Wallet;
