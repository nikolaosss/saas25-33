const { kafka } = require('../config/kafka');

async function startConsumer() {
  const consumer = kafka.consumer({ groupId: 'review-reply-group' }); // σταθερό groupId

  await consumer.connect();
  await consumer.subscribe({ topic: 'review-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { eventType, data } = JSON.parse(message.value.toString());

        if (eventType === 'ReviewRequestSubmitted') {
          console.log('[ReviewReplyConsumer] Received event:', data);
        }
      } catch (err) {
        console.error('[Kafka Consumer Error]', err.message);
      }
    }
  });
}

module.exports = { startConsumer };
