const express = require('express');
const tierController = require('../controllers/tier.controller');
const { authMiddleware, isStore, isUser } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, isStore, tierController.create);
router.post('/edit', authMiddleware, isStore, tierController.edit);

module.exports = router;