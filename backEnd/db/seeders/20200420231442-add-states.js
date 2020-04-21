'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("States", [
      { stateName: 'AL', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'AK', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'AZ', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'AR', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'CA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'CO', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'CT', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'DE', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'FL', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'GA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'HI', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'ID', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'IL', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'IN', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'IA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'KS', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'KY', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'LA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'ME', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MD', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MI', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MN', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MS', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MO', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'MT', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NE', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NV', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NH', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NJ', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NM', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NY', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'NC', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'ND', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'OH', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'OK', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'OR', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'PA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'RI', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'SC', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'SD', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'TN', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'TX', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'UT', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'VT', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'VA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'WA', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'WV', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'WI', createdAt: new Date(), updatedAt: new Date() },
      { stateName: 'WY', createdAt: new Date(), updatedAt: new Date() },
    ]);
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
