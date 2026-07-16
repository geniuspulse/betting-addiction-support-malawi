const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/basm_db';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // Set to console.log in development if needed
  define: {
    timestamps: true,
    underscored: true,
  },
});

module.exports = sequelize;
