const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Assessment = sequelize.define('Assessment', {
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
  answers: {
    type: DataTypes.JSONB, // Stores: [ { questionId: 1, answerValue: 3 }, ... ]
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  riskCategory: {
    type: DataTypes.ENUM('low', 'moderate', 'high'),
    allowNull: false,
    field: 'risk_category',
  },
  recoveryPlan: {
    type: DataTypes.JSONB, // Stores generated plan elements
    allowNull: false,
    field: 'recovery_plan',
  },
});

module.exports = Assessment;
