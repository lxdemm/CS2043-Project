module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    Course_ID: DataTypes.TEXT,
    Course_Name: DataTypes.TEXT,
    Credit_Hours: DataTypes.INTEGER,  
    Section_ID: DataTypes.TEXT,
    Instructor: DataTypes.TEXT,
    Goal_Grade: DataTypes.TEXT,
    Assignments: DataTypes.INTEGER,
    Labs: DataTypes.INTEGER,
    Quizzes: DataTypes.INTEGER,
    Midterms: DataTypes.INTEGER,
    Complete: DataTypes.BOOLEAN,
    Final_Grade: DataTypes.TEXT,
    Grade_Scheme: DataTypes.TEXT,
  }, {});
  Course.associate = function(models) {
    Course.belongsTo(models.Student, {
      foreignKey: 'username',
      onDelete: 'CASCADE',
    });
    Course.hasMany(models.Assessment, {
      foreignKey: 'courseId',
      as: 'assessments',
    });
    Course.hasMany(models.Class, {
      foreignKey: 'courseId',
      as: 'classes',
    });
  };
  return Course;
};