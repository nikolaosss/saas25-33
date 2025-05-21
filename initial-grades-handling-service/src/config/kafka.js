const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'initial-grades-handling-service', 
  brokers: ['kafka:9092'] 
});

module.exports = { kafka };
