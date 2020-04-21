'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "Demo@DemoUser.com",
        username: "DemoUser",
        hashedPassword: "",
        firstName: "Demo",
        lastName: "User",
        userPetPrefId: null,
        phoneNum: "0000000000",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
