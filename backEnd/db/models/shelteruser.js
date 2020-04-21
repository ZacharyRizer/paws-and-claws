'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShelterUser = sequelize.define('ShelterUser', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    shelterName: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    stateId: DataTypes.INTEGER,
    zipCode: DataTypes.STRING,
  }, {});
  ShelterUser.associate = function (models) {
    ShelterUser.hasMany(models.AdoptionRequest, { foreignKey: 'shelterId' });
    ShelterUser.hasMany(models.Pet, { foreignKey: 'shelterId' });
    ShelterUser.belongsTo(models.State, { foreignKey: 'stateId' });
  };
  return ShelterUser;
};