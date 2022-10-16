const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const router = express.Router();

router.post("/create", transactionController.create);
router.get("/getUser", transactionController.getAllForUser);
router.get("/getStore", transactionController.getAllForStore);

module.exports = router;
