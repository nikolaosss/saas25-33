const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/route');
const app = express();

const PORT =  3001;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`User management service running on port ${PORT}`);
});

