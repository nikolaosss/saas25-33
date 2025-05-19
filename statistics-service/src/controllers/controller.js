// src/controllers/controller.js

const statsService = require('../services/service');

const receiveGrade = async (req, res) => {
  try {
    const gradeData = req.body;
    await statsService.processGrade(gradeData);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error processing grade:', err.message);
    res.status(500).json({ message: 'Failed to process grade' });
  }
};

module.exports = { receiveGrade };
