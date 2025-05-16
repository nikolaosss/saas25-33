const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/grades/access', authMiddleware, controller.getGrades);

module.exports = router;
