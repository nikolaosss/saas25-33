const statsService = require('../services/service');

exports.updateStats = async (req, res) => {
  try {
    const { courseId, grade } = req.body;
    
    // Βασικό validation
    if (!courseId || typeof grade !== 'number') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await statsService.updateStatistics(courseId, grade);
    res.json({ success: true });
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ error: err.message });
  }
};