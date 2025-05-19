const { kafka } = require('../config/kafka');
const producer = kafka.producer();

let isConnected = false;

async function publishMessage(topic, message) {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
  }

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
}

module.exports = { publishMessage };
