const express = require('express');
const publishRoute = require('./api/publish');

const app = express();
app.use(express.json());
app.use('/publish', publishRoute);

module.exports = app;
