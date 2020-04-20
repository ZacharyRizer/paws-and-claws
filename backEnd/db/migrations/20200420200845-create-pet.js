'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pets', {
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
      shelterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ShelterUsers',
          key: 'id'
        },
      },
      petName: {
        allowNull: false,
        type: Sequelize.STRING(128)
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
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      photo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isAdopted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isOkayKids: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isOkayPets: {
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
    return queryInterface.dropTable('Pets');
  }
};