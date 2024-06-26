'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('market_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockId: {
        type: Sequelize.INTEGER,
        references:{
          model: "registerd_stocks",
          key:"id"
        },
        onDelete: "CASCADE",
        onUpdate:"CASCADE"
      },
      today_date: {
        type: Sequelize.DATEONLY
      },
      open_price: {
        type: Sequelize.DECIMAL(10,2)
      },
      low_price: {
        type: Sequelize.DECIMAL(10,2)
      },
      high_price: {
        type: Sequelize.DECIMAL(10,2)
      },
      close_price: {
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('market_data');
  }
};