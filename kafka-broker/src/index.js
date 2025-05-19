require('dotenv').config();
const app = require('./server');
const { startConsumers } = require('./kafka/consumer');

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Kafka Broker API running on port ${PORT}`);
  startConsumers(); // 🧠 start Kafka listeners
});
