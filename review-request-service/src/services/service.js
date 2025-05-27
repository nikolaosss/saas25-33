const db = require('../db');
const { publishEvent } = require('../kafka/producer');

// Δημιουργία νέου review request με async/await
const createReviewRequest = async (reviewData, callback) => {
  const {
    academic_id,
    course_id,
    initial_grade,
    message,
    status,
    instructor_id,
    created_at
  } = reviewData;

  const sql = `
    INSERT INTO ReviewRequest 
    (academic_id, course_id, initial_grade, message, status, instructor_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [
      academic_id,
      course_id,
      initial_grade,
      message,
      status,
      instructor_id,
      created_at
    ]);

    const reviewWithId = { id: result.insertId, ...reviewData };

    try {
      await publishEvent('ReviewRequestSubmitted', reviewWithId);
    } catch (kafkaError) {
      console.error('[Kafka] Publish failed:', kafkaError.message);
    }

    callback(null, reviewWithId);
  } catch (err) {
    callback(err);
  }
};

// Επιστροφή όλων των review requests
const getAllReviews = async (callback) => {
  try {
    const [rows] = await db.query('SELECT * FROM ReviewRequest');
    callback(null, rows);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createReviewRequest,
  getAllReviews
};
