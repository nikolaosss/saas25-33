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



const getByStudentId = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM review_requests WHERE student_id = ?', [studentId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching review requests:', err);
    res.status(500).send('Database error');
  }
};

module.exports = {createReview,  getReviews, getByStudentId};
