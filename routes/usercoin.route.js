const express = require("express");
const usercoinController = require("../controllers/userCoin.controller");
const router = express.Router();

router.post("/create", usercoinController.create);
router.get("/coin", usercoinController.getCoins);
router.post("/coin", usercoinController.updateCoins);

module.exports = router;
