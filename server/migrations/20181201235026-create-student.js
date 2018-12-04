module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      First_Name: {
        type: Sequelize.TEXT
      },
      Last_Name: {
        type: Sequelize.TEXT
      },
      Student_Email: {
        type: Sequelize.TEXT
      },
      Student_ID: {
        type: Sequelize.INTEGER
      },
      Username: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      Password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};