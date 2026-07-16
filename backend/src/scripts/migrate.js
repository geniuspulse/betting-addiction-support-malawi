const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL is not defined in environment variables.');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

async function migrate() {
  try {
    console.log('Connecting to the database for migration running...');
    await sequelize.authenticate();
    console.log('Connected successfully.');

    const queryInterface = sequelize.getQueryInterface();

    // Ensure migrations table exists to keep track of completed migrations
    await queryInterface.createTable('migrations', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      executed_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    });

    // Read executed migrations
    const executedMigrationsList = await sequelize.query(
      'SELECT name FROM migrations ORDER BY name ASC',
      { type: sequelize.QueryTypes.SELECT }
    );
    const executedMigrations = new Set(executedMigrationsList.map(m => m.name));

    // Read migration files
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log('No migrations directory found.');
      process.exit(0);
    }

    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // ensures they run in lexicographical order (e.g. 001_, 002_)

    console.log(`Found ${migrationFiles.length} migration files in directory.`);

    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsDir, file);
      const migration = require(migrationPath);
      const migrationName = migration.name || file;

      if (executedMigrations.has(migrationName)) {
        console.log(`Migration already executed: ${migrationName} - skipping`);
        continue;
      }

      console.log(`Running migration: ${migrationName}...`);
      
      // Start a transaction for each migration to ensure atomic updates
      const transaction = await sequelize.transaction();
      try {
        await migration.up(queryInterface, Sequelize, transaction);
        
        // Record migration execution in DB
        await sequelize.query(
          'INSERT INTO migrations (name, executed_at) VALUES (:name, NOW())',
          {
            replacements: { name: migrationName },
            transaction
          }
        );

        await transaction.commit();
        console.log(`Migration succeeded: ${migrationName}`);
      } catch (err) {
        await transaction.rollback();
        console.error(`Migration FAILED: ${migrationName}. Transaction rolled back.`);
        throw err;
      }
    }

    console.log('All pending migrations have been executed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration process failed:', error);
    process.exit(1);
  }
}

migrate();
