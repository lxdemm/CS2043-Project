module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      Title: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      Type: {
        //allowNull: false,
        type: Sequelize.TEXT
      },
      Complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      Due_Date: {
        type: Sequelize.TEXT
      },
      Grade: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      courseId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Courses',
          key: 'id',
          as: 'courseId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Assessments');
  }
};