const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Subscription = sequelize.define('Subscription', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  plan: { type: DataTypes.ENUM('free', 'premium'), defaultValue: 'free' },
  priceMWK: { type: DataTypes.INTEGER, defaultValue: 0 },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
  status: { type: DataTypes.ENUM('active', 'expired', 'cancelled'), defaultValue: 'active' },
  paymentReference: { type: DataTypes.STRING }, // mobile money transaction ref
  paymentMethod: { type: DataTypes.ENUM('airtel_money', 'tnm_mpamba', 'bank', 'cash'), },
}, { tableName: 'subscriptions', timestamps: true });

module.exports = Subscription;
