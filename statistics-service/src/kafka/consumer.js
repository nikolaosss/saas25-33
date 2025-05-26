const { kafka } = require('../config/kafka');
const { updateStatistics } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'statistics-group' });

const startStatisticsConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'initial-grades', fromBeginning: true });

  console.log('[Kafka STATISTICS CONSUMER] Listening to topic "initial-grades"...');

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        const grades = Array.isArray(data) ? data : [data];

        for (const g of grades) {
          const grade = g.grade ?? g.finalGrade;

          if (!g.courseId || typeof grade !== 'number') {
            console.warn('[STATISTICS] Invalid grade object skipped:', g);
            continue;
          }

          await updateStatistics(g.courseId, grade);
          console.log(`[STATISTICS] Updated: ${g.courseId} => ${grade}`);
        }
      } catch (err) {
        console.error('[Statistics Consumer Error]', err.message);
      }
    }
  });
};

module.exports = { startStatisticsConsumer };
