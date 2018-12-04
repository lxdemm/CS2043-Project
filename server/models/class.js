module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    Type: DataTypes.TEXT,
    Days: DataTypes.TEXT,
    Start_Time: DataTypes.TEXT,
    End_Time: DataTypes.TEXT
  }, {});
  Class.associate = function(models) {
    Class.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };
  return Class;
};