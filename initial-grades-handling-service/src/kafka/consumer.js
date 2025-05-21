const { kafka } = require('../config/kafka');
const { saveInitialGrades } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'initial-grades-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'initial-grades', fromBeginning: false });

  console.log('[Kafka CONSUMER] Listening to topic "initial-grades"...');

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const data = JSON.parse(message.value.toString());

        await saveInitialGrades([data]); // Μονή εγγραφή
        console.log('[Kafka CONSUMER] Saved grade to DB:', data);
      } catch (err) {
        console.error('[Consumer Error]', err.message);
      }
    }
  });
};

module.exports = { startConsumer };
