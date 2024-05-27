'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("market_data", [
    {
      stockId: 1,
      today_date: "2024/05/23",
      open_price: 100.79,
      low_price: 95.75,
      high_price: 108.68,
      close_price: 101.75,
      createdAt: new Date(),
    },{
      stockId: 2,
      today_date: "2024/05/23",
      open_price: 101.95,
      low_price: 97.75,
      high_price: 110.68,
      close_price: 100.75,
      createdAt: new Date(),
    },{
      stockId: 3,
      today_date: "2024/05/23",
      open_price: 110.79,
      low_price: 97.75,
      high_price: 120.68,
      close_price: 110.75,
      createdAt: new Date(),
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
