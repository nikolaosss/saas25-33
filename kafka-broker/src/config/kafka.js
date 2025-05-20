const { Kafka, logLevel } = require('kafkajs');

let isRunning = false; // Προστασία από πολλαπλές εκτελέσεις

const kafka = new Kafka({
  clientId: 'kafka-broker-service',
  brokers: ['kafka:9092'],
  logLevel: logLevel.INFO,
  retry: {
    initialRetryTime: 1000,
    retries: 10,
  },
});

const consumer = kafka.consumer({
  groupId: 'kafka-broker-group', // σταθερό groupId!
});

async function startConsumer() {
  if (isRunning) {
    console.log('[Kafka] Consumer already running. Skipping...');
    return;
  }

  isRunning = true;

  try {
    console.log('[Kafka] Connecting...');
    await consumer.connect();

    console.log('[Kafka] Subscribing to topic: initial-grades');
    await consumer.subscribe({ topic: 'initial-grades', fromBeginning: true });

    console.log('[Kafka] Running consumer...');
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`[Kafka] ${topic} [${partition}] > ${message.value.toString()}`);
      },
    });

    console.log('[Kafka] Consumer started successfully');
  } catch (err) {
    console.error('[Kafka] Failed to start consumer:', err.message);
    process.exit(1);
  }
}

startConsumer();

module.exports = { kafka };
