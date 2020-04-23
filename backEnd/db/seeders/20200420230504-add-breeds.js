'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Breeds", [
      { breedName: "Labrador Retriever", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "German Shepherd", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Beagle", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Golden Retriever", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Yorkshire Terrier", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Bulldog", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Boxer", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Poodle", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Dachshund", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Rottweiler", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Shih Tzu", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Miniature Schnauzer", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Doberman Pincher", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Chihuahua", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "German Short-haired Pointer", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Siberian Husky", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Pomeranian", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "French Bulldog", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Great Dane", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Shetland sheepdog", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Shiba Inu", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      { breedName: "Mixed Breed", petType: "Dog", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Siamese", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Persian", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Maine Coon", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "RagDoll", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Bengal", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Abyssinian", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Birman", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Shorthair", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Himalayan", petType: "Cat", createdAt: new Date(), updatedAt: new Date() },
      // { breedName: "Mixed", petType: "Cat", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Breeds", null, {})
  }
};
