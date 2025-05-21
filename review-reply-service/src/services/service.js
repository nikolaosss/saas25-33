const db = require('../db');
const { publishEvent } = require('../kafka/producer');

const createReviewReply = async (replyData, callback) => {
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

  try {
    const [result] = await db.query(sql, [
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
    ]);

    const replyWithId = { id: result.insertId, ...replyData };

    try {
      await publishEvent('ReviewReplySubmitted', replyWithId);
    } catch (kafkaErr) {
      console.error('[Kafka Error] Could not publish reply:', kafkaErr.message);
    }

    callback(null, replyWithId);
  } catch (err) {
    console.error('[DB Error] Failed to insert review reply:', err);
    callback(err);
  }
};

module.exports = { createReviewReply };
