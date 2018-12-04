module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    First_Name: DataTypes.TEXT,
    Last_Name: DataTypes.TEXT,
    Student_Email: DataTypes.TEXT,
    Student_ID: DataTypes.INTEGER,
    Username: DataTypes.TEXT,
    Password: DataTypes.TEXT
  }, {});
  Student.associate = function(models) {
    Student.hasMany(models.Course, {
      foreignKey: 'username',
      as: 'courses',
    });
  };
  return Student;
};