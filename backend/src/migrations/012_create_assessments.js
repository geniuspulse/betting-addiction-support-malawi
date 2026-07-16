module.exports = {
  name: '012_create_assessments',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assessments', {
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
      answers: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      risk_category: {
        type: Sequelize.ENUM('low', 'moderate', 'high'),
        allowNull: false
      },
      recovery_plan: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable('assessments');
  }
};
