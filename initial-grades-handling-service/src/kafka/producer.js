const { kafka } = require('../config/kafka');

const producer = kafka.producer();
let connected = false;

const publishInitialGrades = async (grades) => {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  const messages = grades.map((g) => ({
    value: JSON.stringify(g),
  }));

  await producer.send({
    topic: 'initial-grades',
    messages,
  });

  console.log(`[Kafka PRODUCER] Published ${grades.length} grades`);
};

module.exports = { publishInitialGrades };
