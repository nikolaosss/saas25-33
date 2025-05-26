const { updateStatistics } = require('../services/service');

exports.updateStats = async (req, res) => {
  try {
    const { courseId, grade } = req.body;

    if (!courseId || typeof grade !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    await updateStatistics(courseId, grade);
    res.json({ success: true });
  } catch (err) {
    console.error('[Stats Controller Error]', err.message);
    res.status(500).json({ error: err.message });
  }
};
