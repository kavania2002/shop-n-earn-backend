const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/store", require('./store.route'));
router.use('/tier', require('./tier.route'));
router.use("/category", require('./category.route'));

module.exports = router;
