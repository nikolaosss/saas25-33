const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(express.json());

const routes = require('./routes/route');

const PORT =  3005;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Initial grades handling service running on port ${PORT}`);
});

