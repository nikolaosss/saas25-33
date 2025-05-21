const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'review-request-service',
  brokers: ['kafka:9092'] 
});

module.exports = { kafka };
