'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("UserPetPreferences", [
      {
        userId: 1,
        breedId: 2,
        age: 1,
        sex: 1,
        size: 1,
        isOkayPets: true,
        isOkayKids: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserPetPreferences", null, {});
  }
};
