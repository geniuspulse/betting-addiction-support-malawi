const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Counsellor = sequelize.define('Counsellor', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  profilePhoto: { type: DataTypes.STRING }, // URL
  specialization: { type: DataTypes.STRING },
  qualifications: { type: DataTypes.TEXT }, // e.g. "MSc Clinical Psychology, University of Malawi"
  licenseNumber: { type: DataTypes.STRING },
  licenseVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  languages: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['English', 'Chichewa'] },
  sessionRate: { type: DataTypes.INTEGER, defaultValue: 15000 }, // MWK per session
  platformFeePercent: { type: DataTypes.INTEGER, defaultValue: 20 }, // platform keeps 20%
  bio: { type: DataTypes.TEXT },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  status: { type: DataTypes.ENUM('pending', 'approved', 'suspended'), defaultValue: 'pending' },
  totalEarnings: { type: DataTypes.INTEGER, defaultValue: 0 }, // MWK
  totalSessions: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  stripeAccountId: { type: DataTypes.STRING }, // for future payment processing
}, { tableName: 'counsellors', timestamps: true });

module.exports = Counsellor;
