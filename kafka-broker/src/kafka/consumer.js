const { kafka } = require('./config');

async function createConsumer({ groupId, fromBeginning = false }) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return { consumer, fromBeginning };
}

async function startConsuming({ consumer, topic, fromBeginning, onMessage }) {
  await consumer.subscribe({ topic, fromBeginning });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const parsedMessage = JSON.parse(message.value.toString());
        await onMessage(parsedMessage);
      } catch (err) {
        console.error('Error processing message:', err);
      }
    },
  });
}

async function stopConsuming(consumer) {
  await consumer.disconnect();
}

module.exports = { 
  createConsumer, 
  startConsuming, 
  stopConsuming,
};