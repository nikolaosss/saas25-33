const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/route');

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Initial Access Service running on port ${PORT}`);
});
