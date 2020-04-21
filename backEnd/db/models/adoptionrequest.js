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
    AdoptionRequest.belongsTo(models.Pet, { foreignKey: 'petId'});
    AdoptionRequest.belongsTo(models.ShelterUser, { foreignKey: 'shelterId'});
    AdoptionRequest.belongsTo(models.User, { foreignKey: 'userId'});
  };
  return AdoptionRequest;
};