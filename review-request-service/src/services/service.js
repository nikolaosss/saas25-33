const axios = require('axios'); // npm install axios
const db = require('../db');    // Βεβαιώσου ότι υπάρχει το αρχείο db.js

const createReviewRequest = (reviewData, callback) => {
  const {
    academic_id,
    course_id,
    initial_grade,
    message,
    status,
    created_at
  } = reviewData;

  const sql = `
    INSERT INTO ReviewRequest (academic_id, course_id, initial_grade, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [academic_id, course_id, initial_grade, message, status, created_at],
    async (err, result) => {
      if (err) return callback(err);

      const reviewWithId = { id: result.insertId, ...reviewData };

      try {
        await axios.post('http://kafka-broker:3002/publish', {
          topic: 'review-events',
          message: reviewWithId
        });
      } catch (kafkaError) {
        console.error('Kafka publish failed:', kafkaError.message);
      }

      callback(null, reviewWithId);
    }
  );
};

const getAllReviews = async () => {
  const sql = 'SELECT * FROM ReviewRequest';
  const [rows] = await db.query(sql);
  return rows;
};


module.exports = {
  createReviewRequest,
  getAllReviews
};
