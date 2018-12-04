module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    Title: DataTypes.TEXT,
    Type: DataTypes.TEXT,
    Complete: DataTypes.BOOLEAN,
    Due_Date: DataTypes.TEXT,
    Grade: DataTypes.TEXT
  }, {});
  Assessment.associate = function(models) {
    Assessment.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };
  return Assessment;
};