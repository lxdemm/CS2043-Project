module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      Course_ID: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      Course_Name: {
        type: Sequelize.TEXT
      },
      Credit_Hours: {
        type: Sequelize.INTEGER
      },
      Section_ID: {
        type: Sequelize.TEXT
      },
      Instructor: {
        type: Sequelize.TEXT
      },
      Goal_Grade: {
        type: Sequelize.TEXT
      },
      Complete: {
        type: Sequelize.BOOLEAN
      },
      Final_Grade: {
        type: Sequelize.TEXT
      },
      Grade_Scheme: {
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
      username: {
        type: Sequelize.TEXT,
        onDelete: 'CASCADE',
        references: {
          model: 'Students',
          key: 'Username',
          as: 'username',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Courses');
  }
};