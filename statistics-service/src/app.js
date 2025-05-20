const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes/route');
//const statsController = require('./controllers/controller');
const PORT =  3006;

app.use('/api', routes);

// Kafka Consumer Setup (Αυτόματη έναρξη)
require('./services/kafkaService').start();

app.listen(PORT, () => {
  console.log(`Statistics service running on port ${PORT}`);
});
