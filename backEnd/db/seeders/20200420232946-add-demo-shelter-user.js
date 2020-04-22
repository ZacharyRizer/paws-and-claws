'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ShelterUsers", [
      {
        email: "Demo1@DemoShelterUser.com",
        hashedPassword: "$2a$10$rfNptqnxIVN3WgNiYAcYCuP/Bo6J5s1tUysT97QcbZTaS9QzWQpLm",
        shelterName: "Demo Shelter 1",
        phoneNum: "0000000001",
        website: "https://www.demoshelteruser1.demo/",
        address: "0001 Demo Street",
        city: "Portland",
        stateId: 37,
        zipCode: 97206,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "Demo2@DemoShelterUser.com",
        hashedPassword: "$2a$10$rfNptqnxIVN3WgNiYAcYCuP/Bo6J5s1tUysT97QcbZTaS9QzWQpLm",
        shelterName: "Demo Shelter 2",
        phoneNum: "0000000002",
        website: "https://www.demoshelteruser2.demo/",
        address: "0002 Demo Street",
        city: "Memphis",
        stateId: 42,
        zipCode: 38018,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ShelterUsers', null, {});
  }
};
