const { kafka } = require('../config/kafka');
const { updateStatistics } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'statistics-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'initial-grades', fromBeginning: true });

  console.log('[Kafka] Statistics consumer connected and listening to "initial-grades"');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = JSON.parse(message.value.toString());

        console.log(`[Kafka] Received grade:`, value);

        if (!value.courseId || typeof value.grade !== 'number') {
          throw new Error('Invalid message structure');
        }

        await updateStatistics(value.courseId, value.grade);
      } catch (err) {
        console.error('[Kafka] Failed to process message:', err.message);
      }
    }
  });
};

module.exports = { startConsumer };
