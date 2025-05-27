const { updateStatistics } = require('../services/service');
const db = require('../db');

exports.receiveGrade = async (req, res) => {
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

exports.getStatistics = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ error: 'Missing courseId' });
    }

    const [rows] = await db.execute(
      'SELECT * FROM statistics WHERE courseId = ?',
      [courseId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Statistics not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('[Statistics Controller Error]', err.message);
    res.status(500).json({ error: err.message });
  }
};

