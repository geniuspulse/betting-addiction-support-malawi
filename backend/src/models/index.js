const sequelize = require('../config/db');
const User = require('./User');
const CheckIn = require('./CheckIn');
const Achievement = require('./Achievement');
const Assessment = require('./Assessment');
const Wallet = require('./Wallet');
const Post = require('./Post');
const TrainingEnrollment = require('./TrainingEnrollment');
const EmergencyTrigger = require('./EmergencyTrigger');
const UrgeLog = require('./UrgeLog');
const Counsellor = require('./Counsellor');
const Session = require('./Session');
const Subscription = require('./Subscription');

// Associations
// User hasMany CheckIn, Achievement, Assessment, Wallet, Post, TrainingEnrollment, UrgeLog, Subscription
User.hasMany(CheckIn, { foreignKey: 'userId', as: 'checkIns' });
CheckIn.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Achievement, { foreignKey: 'userId', as: 'achievements' });
Achievement.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Assessment, { foreignKey: 'userId', as: 'assessments' });
Assessment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Wallet, { foreignKey: 'userId', as: 'wallet' });
Wallet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(TrainingEnrollment, { foreignKey: 'userId', as: 'trainingEnrollments' });
TrainingEnrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(UrgeLog, { foreignKey: 'userId', as: 'urgeLogs' });
UrgeLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Subscription, { foreignKey: 'userId', as: 'subscriptions' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(EmergencyTrigger, { foreignKey: 'userId', as: 'emergencyTriggers' });
EmergencyTrigger.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Counsellor hasMany Session
Counsellor.hasMany(Session, { foreignKey: 'counsellorId', as: 'sessions' });
Session.belongsTo(Counsellor, { foreignKey: 'counsellorId', as: 'counsellor' });

// User hasMany Session (as client)
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  CheckIn,
  Achievement,
  Assessment,
  Wallet,
  Post,
  TrainingEnrollment,
  EmergencyTrigger,
  UrgeLog,
  Counsellor,
  Session,
  Subscription
};
