const express = require('express');
const publishRoute = require('./api/publish');
const consumeRoute = require('./api/consume'); // <-- Νέος Consumer Router

const app = express();
app.use(express.json());

// Routes
app.use('/publish', publishRoute); // Για publish μηνυμάτων
app.use('/consume', consumeRoute); // Για διαχείριση consumers (start/stop)


module.exports = app;