'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_details.belongsTo(models.user_details, {foreignKey: "userId", onUpdate: "CASCADE", onDelete: "CASCADE"})
      order_details.belongsTo(models.registerd_stocks, {foreignKey: "stockId", onDelete: "CASCADE", onUpdate: "CASCADE"})
      order_details.belongsTo(models.order_status, {foreignKey: "statusId", onDelete: "CASCADE", onUpdate: "CASCADE"})
      order_details.hasMany(models.order_transaction_details, {foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE"})
      order_details.hasMany(models.trades, {foreignKey:"buyOrderId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      order_details.hasMany(models.trades, {foreignKey:"sellOrderId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  order_details.init({
    userId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER,
    order_type: DataTypes.STRING,
    total_price: DataTypes.DECIMAL,
    no_of_share: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_details',
    scopes:{
      byStockId: (stockId)=>{
        return {
          where:{
            stockId: stockId
          }
        }
      }
    }
  });
  order_details.beforeCreate((order, options)=> {
    order.updatedAt = null;
  })
  return order_details;
};