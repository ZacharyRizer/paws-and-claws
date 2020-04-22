'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "Demo@DemoUser.com",
        username: "DemoUser",
        hashedPassword: "$2a$10$rfNptqnxIVN3WgNiYAcYCuP/Bo6J5s1tUysT97QcbZTaS9QzWQpLm",
        firstName: "Demo",
        lastName: "User",
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
