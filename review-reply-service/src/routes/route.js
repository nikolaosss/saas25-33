const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// POST /api/review-replies → δημιουργία απάντησης
router.post('/review-replies', controller.createReply);

module.exports = router;
