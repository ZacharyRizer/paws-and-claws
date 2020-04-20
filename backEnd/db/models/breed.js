'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    breedName: DataTypes.STRING,
    petType: DataTypes.STRING
  }, {});
  Breed.associate = function(models) {
    // associations can be defined here
  };
  return Breed;
};