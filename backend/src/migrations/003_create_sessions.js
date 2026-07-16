module.exports = {
  name: '003_create_sessions',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      counsellor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'counsellors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('video', 'chat', 'group'),
        defaultValue: 'video'
      },
      scheduled_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration_minutes: {
        type: Sequelize.INTEGER,
        defaultValue: 60
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show'),
        defaultValue: 'pending'
      },
      amount_mwk: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      counsellor_payout_mwk: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      platform_fee_mwk: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      payment_status: {
        type: Sequelize.ENUM('unpaid', 'paid', 'refunded'),
        defaultValue: 'unpaid'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      review: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('sessions');
  }
};
