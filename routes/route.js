const express = require("express");
const {
  insertUser,
  updateUserDetails,
  allRegisterdStocks,
  orderbyUser,
  userAccountEntry,
  userPortfolio,
  addMoreBank,
  authLogin,
} = require("../controllers/user.controller");
const passport = require("../config/passport");
const router = express.Router();


router.post("/insert", insertUser);
router.post("/login", authLogin)

router.use("/", passport.authenticate("jwt", {session:false}));
router.post("/update", updateUserDetails);
router.get("/stock", allRegisterdStocks);
router.post("/order", orderbyUser);
router.post("/addmoney", userAccountEntry);
router.post("/addbank", addMoreBank);
router.get("/porfolio", userPortfolio);
module.exports = router;
