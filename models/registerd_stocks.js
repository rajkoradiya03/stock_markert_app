'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registerd_stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      registerd_stocks.hasMany(models.market_data, {foreignKey: "stockId", onDelete: "CASCADE", onUpdate:"CASCADE"})
      registerd_stocks.hasMany(models.order_details, {foreignKey: "stockId", onUpdate: "CASCADE", onDelete: "CASCADE"})
      registerd_stocks.hasMany(models.trades, {foreignKey:"stockId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      registerd_stocks.hasMany(models.users_stocks, {foreignKey:"stockId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  registerd_stocks.init({
    company_symbol: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_owner_name: DataTypes.STRING,
    stock_current_price: DataTypes.DECIMAL,
    market_value: DataTypes.STRING,
    volume: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'registerd_stocks',
  });
  return registerd_stocks;
};