const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller');

const { authMiddleware } = require('../authMiddleware');

router.post('/login', authController.login); 
router.post('/logout', authMiddleware, authController.logout); 
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;