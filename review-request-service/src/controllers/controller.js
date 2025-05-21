const { createReviewRequest  , getAllReviews  } = require('../services/service');

// Δημιουργία νέου review request
const createReview = (req, res) => {
  const reviewData = req.body;

  createReviewRequest(reviewData, (err, result) => {
    if (err) {
      console.error('Error creating review request:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json(result);
  });
};


const getReviews = (req, res) => {
  getAllReviews((err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
};


module.exports = {createReview,  getReviews};
