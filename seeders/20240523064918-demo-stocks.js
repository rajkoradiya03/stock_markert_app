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
   await queryInterface.bulkInsert('registerd_stocks', [
    {
      company_symbol: "NHPC",
      company_name: "National Hydroelectric Power Corporation",
      company_owner_name: "Shri Raj Kumar Chaudhary",
      stock_current_price: 107.15,
      market_value: "1,06,206cr",
      volume: 83072544,
      createdAt: new Date(),
      updatedAt: null
    },{
      company_symbol: "IRFC",
      company_name: "Indian Railway Finance Corp",
      company_owner_name: "Ms shelly Verma",
      stock_current_price: 186.50,
      market_value: "2,29,614cr",
      volume: 215691283,
      createdAt: new Date(),
      updatedAt: null
    },{
      company_symbol: "RVNL",
      company_name: "Rail Vikas Nigam Limited",
      company_owner_name: "Shri. Pradeep Guar",
      stock_current_price: 372.25,
      market_value: "71,214cr",
      volume: 89043295,
      createdAt: new Date(),
      updatedAt: null
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('registerd_stocks', null, {});
  }
};
