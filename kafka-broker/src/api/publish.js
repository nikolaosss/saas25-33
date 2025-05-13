const express = require('express');
const sendMessage = require('../kafka/producer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: 'Topic and message are required.' });
  }

  try {
    await sendMessage(topic, message);
    res.status(200).json({ status: 'Message sent' });
  } catch (err) {
    console.error('Kafka publish error:', err);
    res.status(500).json({ error: 'Kafka publish failed' });
  }
});

module.exports = router;
