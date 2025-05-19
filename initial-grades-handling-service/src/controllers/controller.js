const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const gradeService = require('../services/service');
const axios = require('axios'); // για Kafka publish

const uploadGrades = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'failed', message: 'No file uploaded' });
    }

    const results = [];
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (data) => {
        const gradeEntry = {
          studentId: data.studentId,
          courseId: data.courseId,
          grade: parseFloat(data.grade),
          uploadedBy: req.user.id
        };

        results.push(gradeEntry);

        try {
          await axios.post('http://kafka-broker:3002/publish', {
            topic: 'initial-grades',
            message: gradeEntry
          });
        } catch (err) {
          console.error('Kafka publish error:', err.message);
        }
      })
      .on('end', async () => {
        try {
          const inserted = await gradeService.saveInitialGrades(results);
          res.status(200).json({ status: 'success', inserted });
        } catch (e) {
          res.status(500).json({ status: 'failed', message: e.message });
        } finally {
          fs.unlinkSync(filePath); // cleanup
        }
      });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = { uploadGrades };
