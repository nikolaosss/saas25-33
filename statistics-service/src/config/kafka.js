const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'statistics-service',
  brokers: ['kafka:9092'] // ή ['localhost:9092'] αν είσαι local χωρίς docker
});

module.exports = { kafka };
