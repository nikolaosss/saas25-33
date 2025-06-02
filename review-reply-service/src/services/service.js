const db = require('../db');
const { publishEvent } = require('../kafka/producer');

const createReviewReply = async (data, callback) => {
  const { reply_id, reply_text, reply_grade } = data;

  if (!reply_id || reply_text === undefined || reply_grade === undefined) {
    return callback(new Error("Missing fields"), null);
  }

  const replied_at = new Date().toISOString().split('T')[0];

  try {
    const [result] = await db.query(
      `UPDATE review_replies 
       SET reply_text = ?, reply_grade = ?, replied_at = ?
       WHERE id = ?`,
      [reply_text, reply_grade, replied_at, reply_id]
    );

    if (result.affectedRows === 0) {
      return callback(new Error("No review reply found with given id"), null);
    }

    await publishEvent('ReviewReplySubmitted', {
      review_request_id: reply_id,
      reply_text,
      reply_grade,
      replied_at
    });

    callback(null, { message: 'Reply updated and event published successfully' });
  } catch (err) {
    console.error('[createReviewReply ERROR]', err.message);
    callback(err, null);
  }
};

module.exports = { createReviewReply };
