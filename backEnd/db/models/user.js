'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNum: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.UserPetPreference, { foreignKey: 'userId' })
    User.hasMany(models.AdoptionRequest, { foreignKey: 'userId' })
  };
  return User;
};