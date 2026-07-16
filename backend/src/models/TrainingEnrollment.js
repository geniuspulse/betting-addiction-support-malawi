const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TrainingEnrollment = sequelize.define('TrainingEnrollment', {
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
  programId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'program_id',
  },
  lessonsCompleted: {
    type: DataTypes.JSONB, // Array of lesson IDs that are completed
    defaultValue: [],
    allowNull: false,
    field: 'lessons_completed',
  },
  status: {
    type: DataTypes.ENUM('enrolled', 'completed', 'dropped'),
    defaultValue: 'enrolled',
    allowNull: false,
  },
});

module.exports = TrainingEnrollment;
