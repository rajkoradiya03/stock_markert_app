'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registerd_stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_symbol: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_owner_name: {
        type: Sequelize.STRING
      },
      stock_current_price: {
        type: Sequelize.DECIMAL(10,2)
      },
      market_value: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registerd_stocks');
  }
};