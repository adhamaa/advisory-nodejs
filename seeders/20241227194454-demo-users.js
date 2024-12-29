'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password_here',
        role_type: 'u',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashed_password_here',
        role_type: 'a',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

