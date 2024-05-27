'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trades.belongsTo(models.order_details, {foreignKey: "buyOrderId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      trades.belongsTo(models.order_details, {foreignKey: "sellOrderId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      trades.belongsTo(models.registerd_stocks, {foreignKey: "stockId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  trades.init({
    buyOrderId: DataTypes.INTEGER,
    sellOrderId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER,
    per_share_price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trades',
  });

  trades.beforeCreate((trade, options)=>{
    trade.updatedAt = null;
  })
  return trades;
};