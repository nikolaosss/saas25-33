const express = require('express');
const router = express.Router();
const { createConsumer, startConsuming, stopConsuming } = require('../kafka/consumer');

const activeConsumers = new Map();

router.post('/start', async (req, res) => {
  const { topic, groupId, fromBeginning = false } = req.body;

  try {
    const { consumer } = await createConsumer({ groupId, fromBeginning });

    const onMessage = (message) => {
      console.log(`[${topic}] Received:`, message);
      // Εδώ μπορείς να καλείς service logic (π.χ., αποθήκευση σε DB)
    };

    await startConsuming({ consumer, topic, fromBeginning, onMessage });
    activeConsumers.set(groupId, consumer);

    res.status(200).json({ 
      status: 'success', 
      message: `Consumer started for topic: ${topic}` 
    });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/stop', async (req, res) => {
  const { groupId } = req.body;

  try {
    const consumer = activeConsumers.get(groupId);
    if (!consumer) throw new Error(`Consumer ${groupId} not found`);

    await stopConsuming(consumer);
    activeConsumers.delete(groupId);

    res.status(200).json({ 
      status: 'success', 
      message: `Consumer ${groupId} stopped` 
    });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

module.exports = router;