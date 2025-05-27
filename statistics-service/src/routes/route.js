const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/statistics', controller.receiveGrade);
router.get('/statistics', controller.getStatistics);

module.exports = router;
