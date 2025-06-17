const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'final-grades-import-service', 
  brokers: ['kafka:9092'] 
});

module.exports = { kafka };
