const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/store", require("./store.route"));

module.exports = router;
