const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/create', categoryController.create);
router.get('/get', categoryController.get);

module.exports = router;