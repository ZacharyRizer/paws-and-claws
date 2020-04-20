'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdoptionRequest = sequelize.define('AdoptionRequest', {
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    isAccepted: DataTypes.BOOLEAN
  }, {});
  AdoptionRequest.associate = function(models) {
    // associations can be defined here
  };
  return AdoptionRequest;
};