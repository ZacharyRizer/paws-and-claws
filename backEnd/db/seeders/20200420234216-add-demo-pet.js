'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Pets", [
      {
        breedId: 22,
        shelterId: 1,
        petName: "Doge",
        age: 4,
        sex: 2,
        size: 3,
        description: "Much doge. Very wow.",
        photo: "https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg",
        isAdopted: false,
        isOkayKids: true,
        isOkayPets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        breedId: 2,
        shelterId: 1,
        petName: "Shana",
        age: 9,
        sex: 2,
        size: 4,
        description:
          "Shana came to us as a retired breeder dog from a farm and is a purebred German Shepherd. Shana is about 9 years old and she does need to lose some weight at 90 pounds. Shana is very good with people, children and other dogs. She had been loose as a farm dog and is used to be around all kinds of livestock and does very well with them. Shana is scheduled to be spayed and have a dental. Shana is doing very well with housebreaking in her foster home. Shana is up to date with vaccines, microchipped and heartworm negative. ",
        photo:
          "https://www.thesprucepets.com/thmb/Nqk3SUnjbLg1P57lccf6_zGiPz4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-977898246-1942d4364fa64bd2ba792a86f4f24715.jpg",
        isAdopted: false,
        isOkayKids: true,
        isOkayPets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Pets", null, {});
  }
};
