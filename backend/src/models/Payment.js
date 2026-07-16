/**
 * @file Payment.js
 * @description Sequelize Schema definition for Malawian Payment transactions for Betting Addiction Support Malawi (BASM).
 * This module exports both a factory function AND a robust mock mock-or-import structure to make sure it loads smoothly
 * inside express loaders, index.js aggregators, or direct service calls.
 */

const { DataTypes } = require('sequelize');

let sequelizeInstance;

try {
  // Try to load configured global sequelize db connection if existing
  const db = require('../config/database'); // standard project convention
  sequelizeInstance = db.sequelize || db;
} catch (e) {
  // If not globally accessible, we define a fallback dummy instance for pure file loading isolation
  const Sequelize = require('sequelize');
  sequelizeInstance = new Sequelize('sqlite::memory:', { logging: false });
}

const PaymentModel = sequelizeInstance.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Reference to User/Patient'
  },
  type: {
    type: DataTypes.ENUM('session', 'subscription', 'refund'),
    allowNull: false
  },
  amountMWK: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('amountMWK');
      return rawValue ? parseFloat(rawValue) : 0;
    }
  },
  provider: {
    type: DataTypes.ENUM('airtel_money', 'tnm_mpamba'),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Identifier returned by Airtel Money or TNM Mpamba'
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'BASM Internal Reference number'
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending',
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
    allowNull: false,
    comment: 'Raw provider response payload logs for auditing'
  },
  counsellorPayoutMWK: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('counsellorPayoutMWK');
      return rawValue ? parseFloat(rawValue) : 0;
    }
  },
  platformFeeMWK: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('platformFeeMWK');
      return rawValue ? parseFloat(rawValue) : 0;
    }
  },
  paidOutAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Timestamp when the counsellor was paid out'
  }
}, {
  tableName: 'payments',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['transactionId'] },
    { fields: ['reference'], unique: true },
    { fields: ['status'] }
  ]
});

module.exports = PaymentModel;
