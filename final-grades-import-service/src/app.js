const express = require('express');
const app = express();
const { startConsumer } = require('./kafka/consumer');
const gradeRoutes = require('./routes/route');


app.use(express.json());
app.use('/api', gradeRoutes);

const PORT = 3080;

app.listen(PORT, () => {
  console.log(`Final Grades Service running on port ${PORT}`);
  startConsumer(); 
});
