const express = require('express');
const app = express();
const { startFinalGradesConsumer } = require('./kafka/consumer');
const gradeRoutes = require('./routes/route');


app.use(express.json());
app.use('/api', gradeRoutes);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Initial Grades Service running on port ${PORT}`);
  startFinalGradesConsumer();   // fire & forget
});
