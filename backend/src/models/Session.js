const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Session = sequelize.define('Session', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  counsellorId: { type: DataTypes.UUID, allowNull: false },
  type: { type: DataTypes.ENUM('video', 'chat', 'group'), defaultValue: 'video' },
  scheduledAt: { type: DataTypes.DATE, allowNull: false },
  durationMinutes: { type: DataTypes.INTEGER, defaultValue: 60 },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show'), defaultValue: 'pending' },
  amountMWK: { type: DataTypes.INTEGER }, // total charged to user
  counsellorPayoutMWK: { type: DataTypes.INTEGER }, // 80% to counsellor
  platformFeeMWK: { type: DataTypes.INTEGER }, // 20% to platform
  paymentStatus: { type: DataTypes.ENUM('unpaid', 'paid', 'refunded'), defaultValue: 'unpaid' },
  notes: { type: DataTypes.TEXT }, // post-session notes (counsellor only)
  rating: { type: DataTypes.INTEGER }, // 1-5 by user after session
  review: { type: DataTypes.TEXT },
}, { tableName: 'sessions', timestamps: true });

module.exports = Session;
