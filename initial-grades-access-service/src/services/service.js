const db = require('../db');

const getGradesForStudent = async (academicId) => {
  const [rows] = await db.execute(
    `SELECT course_id, grade, uploaded_at FROM initial_grades WHERE student_id = ?`,
    [academicId]
  );
  return rows;
};

module.exports = { getGradesForStudent };
