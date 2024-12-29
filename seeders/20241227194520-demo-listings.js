'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Listings', [
      {
        name: 'Listing 1',
        latitude: 40.7128,
        longitude: -74.0060,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Listing 2',
        latitude: 34.0522,
        longitude: -118.2437,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Listings', null, {});
  },
};

