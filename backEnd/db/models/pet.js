'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    breedId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER,
    petName: DataTypes.STRING,
    age: DataTypes.INTEGER, // 1 = baby (0 - 1 y/o), 2 = young (1 - 4 y/o), 3 = adult (4 - 8 y/o), 4 = mature (8+ y/o)
    sex: DataTypes.INTEGER, // 1 = male, 2 = female
    size: DataTypes.INTEGER, // 1 = smallest, 5 = largest
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    isAdopted: DataTypes.BOOLEAN,
    isOkayKids: DataTypes.BOOLEAN,
    isOkayPets: DataTypes.BOOLEAN
  }, {});
  Pet.associate = function (models) {
    Pet.hasMany(models.AdoptionRequest, { foreignKey: 'petId' });
    Pet.belongsTo(models.Breed, { foreignKey: 'breedId' });
    Pet.belongsTo(models.ShelterUser, { foreignKey: 'shelterId' });
  };
  return Pet;
};