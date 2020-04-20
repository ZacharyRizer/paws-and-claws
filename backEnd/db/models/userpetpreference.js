'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPetPreference = sequelize.define('UserPetPreference', {
    breedId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    sex: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    isOkayPets: DataTypes.BOOLEAN,
    isOkayKids: DataTypes.BOOLEAN
  }, {});
  UserPetPreference.associate = function(models) {
    // associations can be defined here
  };
  return UserPetPreference;
};