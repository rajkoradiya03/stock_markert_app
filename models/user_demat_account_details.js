'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_demat_account_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_demat_account_details.belongsTo(models.user_details, {foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  user_demat_account_details.init({
    userId: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL,
    total_margin: DataTypes.DECIMAL,
    used_margin: DataTypes.DECIMAL,
    available_margin: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'user_demat_account_details',
    paranoid:true,

  });

  user_demat_account_details.beforeCreate((account, options)=>{
    account.updatedAt = null;
  })
  return user_demat_account_details;
};