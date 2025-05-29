const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.getByInstructorId); // GET /api/review-replies
router.post('/', controller.createReply);     // POST /api/review-replies

module.exports = router;
