'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ShelterUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      shelterName: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      phoneNum: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      website: {
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      stateId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'States',
          key: 'id'
        },
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(5),
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
    return queryInterface.dropTable('ShelterUsers');
  }
};