const express = require('express');
const publishRoute = require('./api/publish');
const consumeRoute = require('./api/consume'); 

const app = express();
app.use(express.json());

app.use('/publish', publishRoute); 
app.use('/consume', consumeRoute); 


module.exports = app;