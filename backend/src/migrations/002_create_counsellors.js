module.exports = {
  name: '002_create_counsellors',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('counsellors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profile_photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      specialization: {
        type: Sequelize.STRING,
        allowNull: true
      },
      qualifications: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      license_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      license_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['English', 'Chichewa']
      },
      session_rate: {
        type: Sequelize.INTEGER,
        defaultValue: 15000
      },
      platform_fee_percent: {
        type: Sequelize.INTEGER,
        defaultValue: 20
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'suspended'),
        defaultValue: 'pending'
      },
      total_earnings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_sessions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      stripe_account_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('counsellors');
  }
};
