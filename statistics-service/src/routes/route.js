const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/grades/statistics', controller.receiveGrade);

module.exports = router;
