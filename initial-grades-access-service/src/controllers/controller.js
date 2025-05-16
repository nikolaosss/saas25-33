const gradeService = require('../services/service');

const getGrades = async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ status: 'failed', message: 'Only students can access this resource' });
  }

  try {
    const grades = await gradeService.getGradesForStudent(req.user.academicId);
    res.status(200).json({ status: 'success', grades });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = { getGrades };
    