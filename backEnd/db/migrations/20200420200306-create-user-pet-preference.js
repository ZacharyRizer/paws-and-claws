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
        type: Sequelize.INTEGER,
        references: {
          model: 'Breeds',
          key: 'id'
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      isOkayPets: {
        type: Sequelize.BOOLEAN
      },
      isOkayKids: {
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