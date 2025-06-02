const { kafka } = require('../config/kafka');
const db = require('../db'); // ✅ προσθήκη για DB σύνδεση

async function startConsumer() {
  const consumer = kafka.consumer({ groupId: 'review-reply-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'review-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { eventType, data } = JSON.parse(message.value.toString());
        console.log(eventType)
        if (eventType === 'ReviewRequestSubmitted') {
          console.log('[ReviewReplyConsumer] Received event:', data);

          const {
            id,
            academic_id,
            course_id,
            initial_grade,
            message: requestMessage,
            status,
            created_at,
            instructor_id
          } = data;

          // 🔽 Εισαγωγή στη βάση
          await db.query(`
            INSERT INTO review_replies (
              id,
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            id,
            academic_id,
            course_id,
            initial_grade,
            requestMessage,
            status,
            created_at,
            '',            // reply_text (κενό)
            0,             // reply_grade (0)
            instructor_id,
            new Date()     // replied_at
          ]);

          console.log('✅ Inserted review reply into DB');
        }
      } catch (err) {
        console.error('[Kafka Consumer Error]', err.message);
      }
    }
  });
}

module.exports = { startConsumer };
