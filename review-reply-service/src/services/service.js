const db = require('../db');
const { publishEvent } = require('../kafka/producer');

const createReviewReply = (data, callback) => {
  const { reply_id, reply_text, reply_grade } = data;

  if (!reply_id || reply_text === undefined || reply_grade === undefined) {
    return callback(new Error("Missing fields"), null);
  }

  db.query(
    `UPDATE review_replies 
     SET reply_text = ?, reply_grade = ?, replied_at = CURRENT_DATE 
     WHERE id = ?`,
    [reply_text, reply_grade, reply_id],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, { message: 'Reply updated successfully' });
    }
  );
};


module.exports = { createReviewReply };
