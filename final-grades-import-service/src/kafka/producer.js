const { kafka } = require('../config/kafka');

const producer = kafka.producer();
let connected = false;

const publishFinalGrades = async (grades) => {
  if (!connected) {
    await producer.connect();
    connected = true;
  }
  console.log("[DEBUG] Parsed grades:", grades);

  await producer.send({
    topic: 'final-grades',
    messages: [
      { value: JSON.stringify(grades) } // Ένα message με array
    ],
  });

  console.log(`[Kafka PRODUCER] Published ${grades.length} grades`);
};

module.exports = { publishFinalGrades };
