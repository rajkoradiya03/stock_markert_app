'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_bank_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_bank_details.belongsTo(models.user_details, {foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  user_bank_details.init({
    userId: DataTypes.INTEGER,
    bank_name: DataTypes.STRING,
    acc_number: DataTypes.STRING,
    ifsc_code: DataTypes.STRING,
    branch_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_bank_details',
  });

  user_bank_details.beforeCreate((bank, options)=>{
    bank.updatedAt = null;
  })
  return user_bank_details;
};