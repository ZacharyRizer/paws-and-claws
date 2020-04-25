'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AdoptionRequests", [
      {
        userId: 1,
        petId: 2,
        shelterId: 1,
        message: "I would love to adopt Shana",
        isAccepted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        petId: 4,
        shelterId: 2,
        message: "I would love to adopt this cute doggo!",
        isAccepted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("AdoptionRequests", null, {});
  }
};
