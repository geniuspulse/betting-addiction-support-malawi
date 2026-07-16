const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EmergencyTrigger = sequelize.define('EmergencyTrigger', {
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
  triggeredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'triggered_at',
  },
});

module.exports = EmergencyTrigger;
