const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { publishInitialGrades } = require('../kafka/producer');

const uploadGrades = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'failed', message: 'No file uploaded' });
    }

    const results = [];
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const grade = {
          studentId: data.studentId,
          courseId: data.courseId,
          grade: parseFloat(data.grade),
          uploadedBy: req.user.id
        };
        results.push(grade);
      })
      .on('end', async () => {
        try {
          await publishInitialGrades(results);
          res.status(202).json({ status: 'published', count: results.length });
        } catch (e) {
          console.error('[Kafka Publish Error]', e.message);
          res.status(500).json({ status: 'failed', message: e.message });
        } finally {
          fs.unlinkSync(filePath);
        }
      });

  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = { uploadGrades };
