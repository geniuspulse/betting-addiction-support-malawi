module.exports = {
  name: '009_create_training_enrollments',
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('training_enrollments', {
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
      program_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lessons_completed: {
        type: Sequelize.JSONB,
        defaultValue: [],
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('enrolled', 'completed', 'dropped'),
        defaultValue: 'enrolled',
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
    await queryInterface.dropTable('training_enrollments');
  }
};
