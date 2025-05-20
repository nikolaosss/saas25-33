require('dotenv').config();
const app = require('./server');

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Kafka Broker API running on port ${PORT}`);
});
