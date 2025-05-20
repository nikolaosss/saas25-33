const express = require('express');
const router = express.Router();
const { startSimpleConsumer, getBufferedMessages } = require('../kafka/consumer');

router.post('/start', async (req, res) => {
  const { topic, groupId } = req.body;

  if (!topic || !groupId) {
    return res.status(400).json({ error: 'Topic and groupId required' });
  }

  try {
    await startSimpleConsumer(topic, groupId);
    res.status(200).json({ status: `Started consuming ${topic}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/fetch/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const messages = getBufferedMessages(groupId);

  res.status(200).json(messages);
});

module.exports = router;
