module.exports = {
  name: '010_create_urge_logs',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('urge_logs', {
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
      intensity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      trigger: {
        type: Sequelize.STRING,
        allowNull: false
      },
      outcome: {
        type: Sequelize.ENUM('resisted', 'relapsed'),
        allowNull: false
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
    await queryInterface.dropTable('urge_logs');
  }
};
