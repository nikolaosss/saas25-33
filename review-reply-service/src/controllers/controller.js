const { createReviewReply } = require('../services/service');
const db = require('../db'); 

// Δημιουργία νέου review reply
const createReply = (req, res) => {
  const replyData = req.body;

  createReviewReply(replyData, (err, result) => {
    if (err) {
      console.error('Error creating review reply:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json(result);
  });
};

const getByInstructorId = async (req, res) => {
  const { instructorId } = req.query;

  if (!instructorId) {
    return res.status(400).json({ error: 'Missing instructorId' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM review_replies WHERE instructor_id = ?', [instructorId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching review replies:', err);
    res.status(500).send('Database error');
  }
};

module.exports = { createReply, getByInstructorId };
