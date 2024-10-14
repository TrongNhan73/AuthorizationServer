'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users',
      [
        {
          email: 'testtest1@gmail.com',
          password: '1234',
          username: 'testtest'
        },
        {
          email: 'testtest2@gmail.com',
          password: '1234',
          username: 'testtest2'
        },
        {
          email: 'testtest3@gmail.com',
          password: '1234',
          username: 'testtest3'
        },
        {
          email: 'testtest4@gmail.com',
          password: '1234',
          username: 'testtest4'
        },

      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
