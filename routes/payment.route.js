const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post("/getlink", paymentController.makePayment);

module.exports = router;