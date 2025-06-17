const { kafka } = require('../config/kafka');
const { saveFinalGrades } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'final-grades-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'final-grades', fromBeginning: true });

  console.log('[Kafka CONSUMER] Listening to topic "final-grades"...');

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const grades = JSON.parse(message.value.toString());

        if (!Array.isArray(grades)) {
          console.warn('[Kafka CONSUMER] Expected array but got:', grades);
          return;
        }

        await saveFinalGrades(grades);
        console.log(`[Kafka CONSUMER] Saved ${grades.length} grades to DB`);
      } catch (err) {
        console.error('[Consumer Error]', err.message);
      }
    }
  });
};

module.exports = { startConsumer };
