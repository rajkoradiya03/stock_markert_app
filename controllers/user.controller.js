const md5 = require("md5");
const jwt = require("jsonwebtoken");
const {
  createUser,
  updateUser,
  allStocks,
  checkOrder,
  orderStatus,
  insertOrder,
  updateOrder,
  orderTransaction,
  createTrade,
  userAccount,
  accountDetails,
  addMoney,
  userStocks,
  removeStock,
  portfolio,
  stockHoldByUser,
  addBank,
  findUser,
} = require("../repositories/user.repositories");

const insertUser = async (req, res) => {
  try {
    let password = req.body.password;
    password = md5(password);
    const details = req.body;
    details["password"] = password;
    details["pan_number"] = md5(req.body.panNumber);
    details["createdAt"] = new Date();
    details["updatedAt"] = null;
    details["user_bank_details"] = {
      bank_name: req.body.bankName,
      acc_number: md5(req.body.accountNo),
      ifsc_code: req.body.ifscCode,
      branch_name: req.body.branchName,
    };

    const user = await createUser(details);

    res.status(200).json(user);
  } catch (error) {
    res.json("error while create user!!" + error);
  }
};

const authLogin = async (req, res) => {
  const email = req.body.email;

  let result = await findUser(email);

  if (!result) {
    res.json("User registered not yet!!");
  } else {
    let password = req.body.password;

    if (email == "" && password == "") {
      res.json("required all fields!!");
    }

    password = md5(password);
    if (password !== result[0].password) {
      res.json("Invalid user details");
    } else {
      const payload = {
        userId: result[0].id,
        email: result[0].email,
      };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res
        .cookie("token", token, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json("user login successfully!!");
    }
  }
};

const updateUserDetails = async (req, res) => {
  try {
    let password = req.body.password;
    password = md5(password);
    const details = req.body;
    details["password"] = password;
    const user = await updateUser(details);

    res.status(200).json("successfully update user!!");
  } catch (error) {
    res.json("error while update user!!");
  }
};

const allRegisterdStocks = async (req, res) => {
  try {
    const allStock = await allStocks();
    res.status(200).json(allStock);
  } catch (error) {
    res.json("error while get all stocks..!!" + error);
  }
};

const orderbyUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const stockId = req.body.stockId;
    const order = await checkOrder(userId, stockId);
    let orderDetails = {};
    if (!order.count) {
      orderDetails["userId"] = userId;
      orderDetails["stockId"] = stockId;
      orderDetails["order_type"] = req.body.orderType;
      orderDetails["total_price"] = req.body.totalPrice;
      orderDetails["no_of_share"] = req.body.noOfShare;
      const statusId = await orderStatus(order.count);
      orderDetails["statusId"] = statusId[0].id;
      orderDetails["createdAt"] = new Date();
      orderDetails["order_transaction_details"] = {};
      orderDetails["order_transaction_details"]["userId"] = userId;
      orderDetails["order_transaction_details"]["amount"] = req.body.totalPrice;
      orderDetails["order_transaction_details"]["transaction_type"] = "debit";
      orderDetails["order_transaction_details"]["transaction_date"] = new Date()
        .toISOString()
        .split("T")[0];

      const dataCount = await accountDetails(userId);
      const balance =
        Number(dataCount.rows[0].balance) - Number(req.body.totalPrice);

      if (balance > 0) {
        await addMoney(balance, userId);
        let result = await insertOrder(orderDetails);

        await userStocks(userId, stockId);
        res.json(result);
      } else {
        res.json("Unsufficiant balanace!!!");
      }
    } else {
      if (order.rows[0].order_type == req.body.orderType) {
        orderDetails["total_price"] =
          Number(order.rows[0].total_price) + Number(req.body.totalPrice);
        orderDetails["no_of_share"] =
          Number(order.rows[0].no_of_share) + Number(req.body.noOfShare);

        const dataCount = await accountDetails(userId);
        const balance =
          Number(dataCount.rows[0].balance) - Number(req.body.totalPrice);

        if (balance > 0) {
          await addMoney(balance, userId);
          const result = await updateOrder(orderDetails, order.rows[0].id);

          const transaction = await orderTransaction(
            createTransaction(
              order.rows[0].id,
              userId,
              "debit",
              req.body.totalPrice
            )
          );

          return res.json({ result, transaction });
        } else {
          res.json("Unsufficiant balanace!!!");
        }
      } else {
        orderDetails["no_of_share"] =
          Number(order.rows[0].no_of_share) - Number(req.body.noOfShare);

        let result = await updateOrder(orderDetails, order.rows[0].id);

        if (orderDetails["no_of_share"] == 0) {
          await removeStock(userId, stockId);
        }
        if (order.count == 1) {
          orderDetails["userId"] = userId;
          orderDetails["stockId"] = stockId;
          orderDetails["order_type"] = req.body.orderType;
          orderDetails["total_price"] = req.body.totalPrice;
          orderDetails["no_of_share"] = req.body.noOfShare;
          const statusId = await orderStatus(order.count);
          orderDetails["statusId"] = statusId[0].id;
          orderDetails["createdAt"] = new Date();
          orderDetails["order_transaction_details"] = {};
          orderDetails["order_transaction_details"]["userId"] = userId;
          orderDetails["order_transaction_details"]["amount"] =
            req.body.totalPrice;
          orderDetails["order_transaction_details"]["transaction_type"] =
            "credit";
          orderDetails["order_transaction_details"]["transaction_date"] =
            new Date().toISOString().split("T")[0];

          result = await insertOrder(orderDetails);

          const dataCount = await accountDetails(userId);
          const balance =
            Number(dataCount.rows[0].balance) + Number(req.body.totalPrice);
          await addMoney(balance, userId);

          let trade = {
            buyOrderId: order.rows[0].id,
            sellOrderId: result.id,
            stockId: stockId,
            per_share_price: req.body.sharePrice,
            quantity: req.body.noOfShare,
          };

          const tradebyuser = await createTrade(trade);
          res.json({ result, tradebyuser });
        } else {
          orderDetails["total_price"] = req.body.totalPrice;
          orderDetails["no_of_share"] = req.body.noOfShare;

          result = await updateOrder(orderDetails, order.rows[1].id);

          const transaction = await orderTransaction(
            createTransaction(
              order.rows[1].id,
              userId,
              "credit",
              req.body.totalPrice
            )
          );

          const dataCount = await accountDetails(userId);
          const balance =
            Number(dataCount.rows[0].balance) + Number(req.body.totalPrice);
          await addMoney(balance, userId);
          let trade = {
            buyOrderId: order.rows[0].id,
            sellOrderId: order.rows[1].id,
            stockId: stockId,
            per_share_price: req.body.sharePrice,
            quantity: req.body.noOfShare,
          };

          const tradebyuser = await createTrade(trade);
          res.json({ result, transaction, tradebyuser });
        }
      }
    }

    function createTransaction(orderId, userId, type, amount) {
      let orderTransaction = {};
      orderTransaction["orderId"] = orderId;
      orderTransaction["userId"] = userId;
      orderTransaction["amount"] = amount;
      orderTransaction["transaction_type"] = type;
      orderTransaction["transaction_date"] = new Date()
        .toISOString()
        .split("T")[0];

      return orderTransaction;
    }
  } catch (error) {
    res.json("error while place order..!!" + error);
  }
};

const userAccountEntry = async (req, res) => {
  const userId = req.user.userId;

  const dataCount = await accountDetails(userId);
  if (!dataCount.count) {
    const accountEntry = req.body;
    accountEntry["userId"] = userId;
    const result = await userAccount(accountEntry);
    res.json(result);
  } else {
    const balance =
      Number(dataCount.rows[0].balance) + Number(req.body.balance);
    const result = await addMoney(balance, userId);
    res.json(result);
  }
};

const userPortfolio = async (req, res) => {
  const userId = req.user.userId;
  const result = await portfolio(userId);
  const result2 = await stockHoldByUser(userId);
  res.json({ result, result2 });
};

const addMoreBank = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bankDetails = req.body;
    bankDetails["userId"] = userId;

    const result = await addBank(bankDetails);

    res.json(result);
  } catch (error) {
    res.json("error while add bank!!" + error);
  }
};
module.exports = {
  insertUser,
  updateUserDetails,
  allRegisterdStocks,
  orderbyUser,
  userAccountEntry,
  userPortfolio,
  addMoreBank,
  authLogin
};
