'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'abdidwiramdani@gmail.com',
        password: 'abdi123'
      },
      {
        nama: 'Konsultan',
      },
      {
        nama: 'F&B',
      },
      {
        nama: 'Usaha Dagang',
      },
      {
        nama: 'Teknologi Informasi',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
