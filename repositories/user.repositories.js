const { Op } = require("sequelize");
const db = require("../models");

const createUser = async (userDetails) => {
    try {
        const newUser = await db.user_details.create(userDetails, {
            include:[db.user_bank_details]
        });
        return newUser;
    } catch (error) {
        console.log("creating user: "+error)
    }
}

const findUser = async (email) => {
    try {
        const result = await db.user_details.findAll({where: {email:email}, raw:true})
        return result;
    } catch (error) {
        console.log("find user: "+ error);
    }
}

const updateUser = async(userDetails) => {
    try {
        const updatedUser = await db.user_details.update(userDetails, {
            where:{
                id: userDetails.id
            }
        });
        return updatedUser;
    } catch (error) {
        console.log(error)
    }
}

const allStocks = async() => {
    const allStock = await db.registerd_stocks.findAll(
        {
            attributes: ["id", "company_symbol", "company_name", "company_owner_name", "stock_current_price", "market_value","volume", "market_data.open_price", "market_data.low_price", "market_data.high_price", "market_data.close_price"],
            include: [{
                model: db.market_data,
                attributes: [],
                required: true
            }],
            raw: true
        }
    )
    return allStock;
}

const checkOrder = async(userId, stockId) => {
    const order = await db.order_details.findAndCountAll({where: {
        userId: userId,
        stockId: stockId,
    },raw:true});
    return order
}

const updateOrder = async(orderDetails, orderId) => {
    const order = await db.order_details.update(orderDetails, {where: {
        id: orderId
    }})

    return order;
}

const orderStatus = async(count)=>{
    if(!count){
        const status = await db.order_status.findAll({attributes: ["id"],where: {
            status: "open"
        }, raw:true})
        return status;
    } else {
        const status = await db.order_status.findAll({attributes: ["id"],where: {
            status: "filled"
        }, raw:true})
        return status;
    }
}

const insertOrder = async(orderDetails) => {
    const order = await db.order_details.create(orderDetails, {
        include:[db.order_transaction_details]
    });
    return order;
}

const orderTransaction = async(orderTransaction)=>{
    const transaction = await db.order_transaction_details.create(orderTransaction);
    return transaction;
}

const getAllOrder = async(stockId) =>{
    const allOrder = await db.order_details.scope({method: ['byStockId', stockId]}).findAll({raw:true});
    return allOrder
}

const createTrade = async (trade)=>{
    const trades = await db.trades.create(trade);
    return trades;
}

const userAccount = async(accountDetails)=>{
    const account = await db.user_demat_account_details.create(accountDetails);
    return account
}

const accountDetails = async(userId)=>{
    const details = await db.user_demat_account_details.findAndCountAll({where:{userId: userId},raw:true})
    return details
}

const addMoney = async(balance, userId) =>{
    const updateBalance = await db.user_demat_account_details.update({balance: balance},{where:{userId:userId}})

    return updateBalance;
}

const userStocks = async(userId,stockId)=>{
    const result = await db.users_stocks.create({userId: userId, stockId:stockId})
    return result
}

const removeStock = async(userId, stockId)=>{
    const result = await db.users_stocks.destroy({where:{userId: userId, stockId:stockId}})
    return result
}
const portfolio = async(userId) => {
    const userPortfolio = await db.user_details.findAll(
        {
            attributes: ["first_name", "last_name","email", "user_demat_account_detail.balance","user_demat_account_detail.used_margin","user_bank_details.bank_name"],
            include:[
                {
                    model:db.user_demat_account_details,
                    attributes:[],
                    required:true
                },
                {
                    model:db.user_bank_details,
                    attributes:[],
                    required:true
                }    
            ],
            where:{
                id: userId
            },
            raw:true
        }
    )
    return userPortfolio
}

const stockHoldByUser = async(userId) => {
    const userStock = await db.registerd_stocks.findAll(
        {
            attributes:["company_symbol","company_name","order_details.no_of_share"],
            include:[
                {
                    model:db.order_details,
                    attributes:[],
                    where:{
                        userId: userId,
                        no_of_share: {
                            [Op.gt]: 0
                        }
                    }
                }
            ],
        }
    )
    return userStock
}

const addBank = async (bankDetails) =>{
    const result = await db.user_bank_details.create(bankDetails);
    return result;
}
module.exports = {createUser, updateUser, allStocks, checkOrder, orderStatus, insertOrder, updateOrder, orderTransaction, getAllOrder, createTrade, userAccount, accountDetails,  addMoney, userStocks, removeStock, portfolio, stockHoldByUser, addBank, findUser}