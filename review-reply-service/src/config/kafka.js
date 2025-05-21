const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'review-reply-service',
  brokers: ['kafka:9092'] // σταθερή διεύθυνση του Kafka container
});

module.exports = { kafka };
