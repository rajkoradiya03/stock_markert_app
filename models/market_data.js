'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class market_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      market_data.belongsTo(models.registerd_stocks, {foreignKey:"stockId", onDelete: "CASCADE", onUpdate:"CASCADE"})
    }
  }
  market_data.init({
    stockId: DataTypes.INTEGER,
    today_date: DataTypes.DATEONLY,
    open_price: DataTypes.DECIMAL,
    low_price: DataTypes.DECIMAL,
    high_price: DataTypes.DECIMAL,
    close_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'market_data',
  });
  return market_data;
};