const { kafka } = require('../config/kafka');

const producer = kafka.producer();
let connected = false;

async function publishEvent(eventType, data) {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  console.log('Sending event to Kafka:', data);
  await producer.send({
  topic: 'ReviewReplySubmitted',
    messages: [{ value: JSON.stringify({ eventType, data }) }]
  });
  console.log('Event sent successfully');

}

module.exports = { publishEvent };
