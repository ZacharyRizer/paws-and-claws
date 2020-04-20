'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userPetPrefId: DataTypes.INTEGER,
    phoneNum: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.UserPetPreference, { foreignKey: 'userPetPrefId' })
    User.hasMany(models.AdoptionRequest, { foreignKey: 'userId' })
  };
  return User;
};