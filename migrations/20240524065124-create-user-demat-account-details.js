'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_demat_account_details', {
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
        onUpdate:"CASCADE"
      },
      balance: {
        type: Sequelize.DECIMAL(10,2)
      },
      total_margin: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue:0
      },
      used_margin: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue:0
      },
      available_margin: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt:{
        allowNull:true,
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_demat_account_details');
  }
};