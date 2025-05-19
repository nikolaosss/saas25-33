const express = require('express');
const router = express.Router();
const { publishMessage } = require('../kafka/producer');

router.post('/', async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ status: 'failed', message: 'Topic and message are required' });
  }

  try {
    await publishMessage(topic, message);
    res.status(200).json({ status: 'success', message: 'Published to Kafka' });
  } catch (err) {
    console.error('Kafka publish error:', err.message);
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

module.exports = router;
