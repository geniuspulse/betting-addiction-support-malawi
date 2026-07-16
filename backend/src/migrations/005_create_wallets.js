module.exports = {
  name: '005_create_wallets',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      daily_bet_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      savings_goal_label: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'General Savings'
      },
      savings_goal_target: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00
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
    await queryInterface.dropTable('wallets');
  }
};
