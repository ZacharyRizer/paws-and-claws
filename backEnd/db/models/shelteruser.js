'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShelterUser = sequelize.define('ShelterUser', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    shelterName: DataTypes.STRING,
    phoneNum: DataTypes.INTEGER,
    website: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  ShelterUser.associate = function(models) {
    // associations can be defined here
  };
  return ShelterUser;
};