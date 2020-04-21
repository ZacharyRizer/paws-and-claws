'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPetPreference = sequelize.define('UserPetPreference', {
    breedId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    sex: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    isOkayPets: DataTypes.BOOLEAN,
    isOkayKids: DataTypes.BOOLEAN
  }, {});
  UserPetPreference.associate = function (models) {
    UserPetPreference.belongsTo(models.Breed, { foreignKey: 'breedId' });
    UserPetPreference.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return UserPetPreference;
};