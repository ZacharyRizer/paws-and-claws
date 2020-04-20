'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPetPreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      breedId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Breeds',
          key: 'id'
        },
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sex: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isOkayPets: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isOkayKids: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPetPreferences');
  }
};