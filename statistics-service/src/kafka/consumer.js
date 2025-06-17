const { kafka } = require('../config/kafka');
const { updateStatistics } = require('../services/service');

const consumer = kafka.consumer({ groupId: 'statistics-group' });

const startStatisticsConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'final-grades', fromBeginning: true });

  console.log('[Kafka STATISTICS CONSUMER] Listening to topic "final-grades"...');

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        const grades = Array.isArray(data) ? data : [data];

        for (const g of grades) {
          const finalGrade = g.finalGrade ?? g.grade;
          const courseId = g.courseId;

          if (!courseId || typeof finalGrade !== 'number') {
            console.warn('[STATISTICS] Skipping invalid record:', g);
            continue;
          }

          // pass all q0X keys to statistics
          await updateStatistics(courseId, finalGrade, g);
          console.log(`[STATISTICS] Updated: ${courseId} => Final: ${finalGrade}`);
        }
      } catch (err) {
        console.error('[Statistics Consumer Error]', err.message);
      }
    }
  });
};

module.exports = { startStatisticsConsumer };
