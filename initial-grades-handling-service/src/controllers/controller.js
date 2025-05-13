const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const gradeService = require('../services/service');

const uploadGrades = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'failed', message: 'No file uploaded' });
    }

    const results = [];
    const filePath = path.join(__dirname, '..', req.file.path);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          studentId: data.studentId,
          courseId: data.courseId,
          grade: parseFloat(data.grade),
          uploadedBy: req.user.id // παίρνουμε από JWT
        });
      })
      .on('end', async () => {
        try {
          const inserted = await gradeService.saveInitialGrades(results);
          res.status(200).json({ status: 'success', inserted });
        } catch (e) {
          res.status(500).json({ status: 'failed', message: e.message });
        } finally {
          fs.unlinkSync(filePath); // καθάρισμα προσωρινού αρχείου
        }
      });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = { uploadGrades };
