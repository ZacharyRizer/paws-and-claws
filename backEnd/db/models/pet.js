'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    breedId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER,
    petName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    isAdopted: DataTypes.BOOLEAN,
    isOkayKids: DataTypes.BOOLEAN,
    isOkayPets: DataTypes.BOOLEAN
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
  };
  return Pet;
};