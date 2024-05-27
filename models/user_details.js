'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_details.hasMany(models.order_details, {foreignKey:"userId", onUpdate:"CASCADE", onDelete:"CASCADE"})
      user_details.hasMany(models.order_transaction_details, {foreignKey:"userId", onDelete: "CASCADE", onUpdate:"CASCADE"}),
      user_details.hasOne(models.user_demat_account_details, {foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      user_details.hasMany(models.user_bank_details, {foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
      user_details.hasMany(models.users_stocks, {foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  user_details.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_no: DataTypes.BIGINT,
    DOB: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    pan_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_details',
    createdAt: "createdAt",
    updatedAt:"updatedAt",
    paranoid:true
  });

  user_details.beforeCreate((user,options)=>{
    user.updatedAt = null;
  })
  return user_details;
};