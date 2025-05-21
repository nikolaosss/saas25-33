const express = require('express');
const app = express();
app.use(express.json());

const { startConsumer } = require('./kafka/consumer');


const routes = require('./routes/route');

const PORT =  3003;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Review requests service running on port ${PORT}`);
  startConsumer();
});
