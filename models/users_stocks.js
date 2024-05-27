'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_stocks.belongsTo(models.user_details, {foreignKey:"userId", onUpdate:"CASCADE",onDelete:"CASCADE"})
      users_stocks.belongsTo(models.registerd_stocks, {foreignKey:"stockId", onUpdate:"CASCADE",onDelete:"CASCADE"})
    }
  }
  users_stocks.init({
    userId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users_stocks',
    paranoid:true
  });

  users_stocks.beforeCreate((userstock, options)=>{
    userstock.updatedAt = null
  })
  return users_stocks;
};