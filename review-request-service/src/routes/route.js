const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// POST /api/review-requests → Δημιουργεί review request
router.post('/review-requests', controller.createReview);

// Αν δεν έχεις υλοποιήσει get yet, κάνε comment:
router.get('/review-requests', controller.getReviews);


module.exports = router; // ✅ πολύ σημαντικό!
