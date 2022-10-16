const express = require("express");
const storeController = require("../controllers/store.controller");
const router = express.Router();

router.post("/register", storeController.register);
router.post("/login", storeController.login);
router.get("/get", storeController.get);

module.exports = router;
