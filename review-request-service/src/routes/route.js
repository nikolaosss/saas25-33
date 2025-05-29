const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/review-requests', controller.createReview);

router.get('/review-requests', controller.getReviews);

router.get('/', controller.getByStudentId);

module.exports = router; // ✅ πολύ σημαντικό!
