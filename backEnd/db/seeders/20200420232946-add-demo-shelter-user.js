'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ShelterUsers", [
      {
        email: "Demo@DemoShelterUser.com",
        hashedPassword: "",
        shelterName: "Demo Shelter",
        phoneNum: "0000000000",
        website: "https://www.demoshelteruser.demo/",
        address: "0000 Demo Street",
        city: "Demo",
        stateId: 8,
        zipCode: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ShelterUsers', null, {});
  }
};
