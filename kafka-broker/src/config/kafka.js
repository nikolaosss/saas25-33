const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kafka-broker-service',
  brokers: ['kafka:9092']
});

module.exports = { kafka };
