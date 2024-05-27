'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_transaction_details.belongsTo(models.order_details, {foreignKey: "orderId", onDelete:"CASCADE", onUpdate: "CASCADE"})
      order_transaction_details.belongsTo(models.user_details, {foreignKey:"userId", onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  order_transaction_details.init({
    orderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    transaction_type: DataTypes.STRING,
    transaction_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'order_transaction_details',
  });
  order_transaction_details.beforeCreate((transaction, options)=>{
    transaction.updatedAt = null;
  })
  return order_transaction_details;
};