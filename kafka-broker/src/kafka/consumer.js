const { kafka } = require('../config/kafka');
const { EventEmitter } = require('events');

// Για buffer μηνυμάτων
const activeConsumers = new Map();
const messageBuffers = new Map();

async function startSimpleConsumer(topic, groupId) {
  if (activeConsumers.has(groupId)) {
    return; // Consumer already running
  }

  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  const buffer = [];
  messageBuffers.set(groupId, buffer);

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        buffer.push(data);

        // Κρατάμε μόνο τα τελευταία 50 μηνύματα
        if (buffer.length > 50) buffer.shift();
      } catch (err) {
        console.error('Message error:', err);
      }
    }
  });

  activeConsumers.set(groupId, consumer);
}

function getBufferedMessages(groupId) {
  return messageBuffers.get(groupId) || [];
}

module.exports = { startSimpleConsumer, getBufferedMessages };
