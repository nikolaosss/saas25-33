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
          const { review_request_id, reply_text, reply_grade, replied_at } = data;

          const [result] = await db.query(
            `UPDATE review_requests
             SET reply_text = ?, reply_grade = ?, replied_at = ?
             WHERE id = ?`,
            [reply_text, reply_grade, replied_at, review_request_id]
          );

          if (result.affectedRows === 0) {
            console.warn(`⚠️ No review request found with id: ${review_request_id}`);
          } else {
            console.log(`✅ Review request ${review_request_id} updated with reply`);
          }
        }

        if (eventType === 'ReviewRequestSubmitted') {
          console.log("ℹ️ Skipping ReviewRequestSubmitted (already handled elsewhere)");
        }
      } catch (err) {
        console.error('[Kafka Consumer Error]', err);
      }
    }
  });
}

module.exports = { startConsumer };
