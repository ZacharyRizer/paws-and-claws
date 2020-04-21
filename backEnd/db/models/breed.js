'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    breedName: DataTypes.STRING,
    petType: DataTypes.STRING
  }, {});
  Breed.associate = function(models) {
    Breed.hasMany(models.Pet, { foreignKey: 'breedId' })
    Breed.hasMany(models.UserPetPreference, { foreignKey: 'breedId' })
  };
  return Breed;
};