'use strict';
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define('food', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    nutrients: DataTypes.INTEGER,
    color: DataTypes.STRING
  }, {});
  food.associate = function(models) {
    // associations can be defined here
  };
  return food;
};