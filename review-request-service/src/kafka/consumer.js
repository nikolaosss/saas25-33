const { kafka } = require('../config/kafka');
const db = require('../db');

async function startConsumer() {
  const consumer = kafka.consumer({ groupId: 'review-request-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'review-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { eventType, data } = JSON.parse(message.value.toString());

        if (eventType === 'ReviewReplySubmitted') {
          console.log('[ReviewRequestConsumer] Updating from reply:', data);

          const sql = `
            UPDATE ReviewRequest
            SET 
              reply_grade = ?,
              reply_text = ?,
              instructor_id = ?,
              replied_at = ?,
              status = 'replied'
            WHERE academic_id = ? AND course_id = ?
          `;

          await db.promise().query(sql, [
            data.reply_grade,
            data.reply_text,
            data.instructor_id,
            data.replied_at,
            data.academic_id,
            data.course_id
          ]);

        }
      } catch (err) {
        console.error('[Kafka Consumer Error]', err.message);
      }
    }
  });
}

module.exports = { startConsumer };
