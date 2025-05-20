const db = require('../db');
const axios = require('axios'); // ensure axios is installed

const createReviewReply = (replyData, callback) => {
  const {
    academic_id,
    course_id,
    initial_grade,
    message,
    status,
    created_at,
    reply_text,
    reply_grade,
    instructor_id,
    replied_at
  } = replyData;

  const sql = `
    INSERT INTO ReviewReply 
    (academic_id, course_id, initial_grade, message, status, created_at, reply_text, reply_grade, instructor_id, replied_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [academic_id, course_id, initial_grade, message, status, created_at, reply_text, reply_grade, instructor_id, replied_at],
    async (err, result) => {
      if (err) return callback(err);

      const replyWithId = { id: result.insertId, ...replyData };

      try {
        await axios.post('http://kafka-broker:3002/publish', {
          topic: 'review-events',
          message: {
            eventType: 'ReviewReplySubmitted',
            data: replyWithId
          }
        });
      } catch (kafkaError) {
        console.error('Kafka publish failed:', kafkaError.message);
      }

      callback(null, replyWithId);
    }
  );
};

module.exports = { createReviewReply };
