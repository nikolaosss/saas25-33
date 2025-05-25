const { kafka } = require('../config/kafka');
const { saveGrade } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'grades-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'initial-grades', fromBeginning: true });

  console.log('[Kafka] Grades consumer connected and listening to "initial-grades"');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = JSON.parse(message.value.toString());
        console.log(`[Kafka] Received grade oeoeoeoe:`, value);

        await saveGrade(value);
      } catch (err) {
        console.error('[Kafka] Failed to process message:', err.message);
      }
    }
  });
};

module.exports = { startConsumer };
