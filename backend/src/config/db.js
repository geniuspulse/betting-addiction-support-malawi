const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('CRITICAL ERROR: DATABASE_URL is not set in the environment variables!');
}

const sequelize = new Sequelize(databaseUrl || 'postgres://postgres:postgres@localhost:5432/basm_db', {
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL database connection established successfully.');
    // In production we use migrations, but let's sync models to ensure database consistency in dev/test
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error.message);
    throw error;
  }
}

// Support both styles of imports to avoid breaking other files
module.exports = sequelize;
module.exports.sequelize = sequelize;
module.exports.connectDB = connectDB;
