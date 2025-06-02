// kafka/producer.js
const { kafka } = require('../config/kafka');

const producer = kafka.producer();
let connected = false;

async function publishEvent(eventType, data) {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  await producer.send({
    topic: 'review-events',
    messages: [{ value: JSON.stringify({ eventType, data }) }]
  });

  console.log(`[Kafka PRODUCER] Published event: ${eventType}`);
}

module.exports = { publishEvent };
