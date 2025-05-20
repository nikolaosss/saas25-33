const { createReviewReply } = require('../services/service');

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

module.exports = { createReply };
