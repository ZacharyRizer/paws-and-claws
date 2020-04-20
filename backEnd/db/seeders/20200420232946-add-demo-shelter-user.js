'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ShelterUsers", [
      {
        email: "Demo@DemoShelterUser.com",
        username: "DemoShelterUser",
        hashedPassword: "",
        shelterName: "Demo Shelter",
        phoneNum: "(000) 000-0000",
        website: "https://www.demoshelteruser.demo/",
        address: "0000 Demo Street",
        city: "Demo",
        state: "DE",
        zipCode: 00000,
        createdAt: new Date(),
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
