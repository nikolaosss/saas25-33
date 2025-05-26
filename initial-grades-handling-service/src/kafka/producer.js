const { kafka } = require('../config/kafka');

const producer = kafka.producer();
let connected = false;

const publishInitialGrades = async (grades) => {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  await producer.send({
    topic: 'initial-grades',
    messages: [
      { value: JSON.stringify(grades) } // Ένα message με array
    ],
  });

  console.log(`[Kafka PRODUCER] Published ${grades.length} grades`);
};

module.exports = { publishInitialGrades };
