'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:"user_details",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        primaryKey:true
      },
      stockId: {
        type: Sequelize.INTEGER,
        references:{
          model: "registerd_stocks",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate:"CASCADE",
        primaryKey:true
      },
      order_type: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.DECIMAL
      },
      no_of_share: {
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.INTEGER,
        references:{
          model:"order_statuses",
          key:"id"
        }
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
    await queryInterface.dropTable('order_details');
  }
};