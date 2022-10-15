const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.use("/auth", require('./auth.route'));

module.exports = router;
