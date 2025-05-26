const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { publishInitialGrades } = require('../kafka/producer');

const uploadGrades = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'failed', message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const workbook = xlsx.readFile(filePath, { codepage: 65001 });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { range: 2 });

    const grades = rows.map(row => ({
      studentId: row.studentId || row.studentID,
      name: row.name,
      email: row.email,
      declarationPeriod: row.declarationPeriod,
      courseId: row.courseId,
      gradeScale: row.gradeScale,
      finalGrade: parseFloat(row.finalGrade),
      q01: row.Q01,
      q02: row.Q02,
      q03: row.Q03,
      q04: row.Q04,
      q05: row.Q05,
      q06: row.Q06,
      q07: row.Q07,
      q08: row.Q08,
      q09: row.Q09,
      q10: row.Q10,
      uploadedBy: req.user.id
    }));

    await publishInitialGrades(grades);
    res.status(202).json({ status: 'published', count: grades.length });
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error('[Upload Error]', err.message);
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = { uploadGrades };
