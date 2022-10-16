const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/store", require('./store.route'));
router.use('/tier', require('./tier.route'));
router.use("/category", require('./category.route'));
router.use("/payment", require('./payment.route'));
router.use("/userCoin", require("./usercoin.route"));
router.use("/transaction", require("./transaction.route"));

module.exports = router;
