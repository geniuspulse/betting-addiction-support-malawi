module.exports = {
  name: '007_create_subscriptions',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscriptions', {
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
      plan: {
        type: Sequelize.ENUM('free', 'premium'),
        defaultValue: 'free'
      },
      price_mwk: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'expired', 'cancelled'),
        defaultValue: 'active'
      },
      payment_reference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_method: {
        type: Sequelize.ENUM('airtel_money', 'tnm_mpamba', 'bank', 'cash'),
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
    await queryInterface.dropTable('subscriptions');
  }
};
