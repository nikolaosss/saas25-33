const axios = require('axios');
const statsService = require('./service');

async function start() {
  try {
    const groupId = 'statistics-group'; // Όχι δυναμικό με Date.now()

    await axios.post('http://kafka-broker:3002/consume/start', {
      topic: 'initial-grades',
      groupId
    });

    setInterval(async () => {
      try {
        const response = await axios.get(`http://kafka-broker:3002/consume/fetch/${groupId}`);
        response.data.forEach(message => {
          statsService.updateStatistics(message.courseId, message.grade);
        });
      } catch (err) {
        console.error('Fetch error:', err.message);
      }
    }, 5000);

  } catch (err) {
    console.error('Kafka setup failed:', err);
  }
}

module.exports = { start };
