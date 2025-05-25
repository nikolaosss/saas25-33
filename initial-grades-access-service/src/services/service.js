const db = require('../db');

const getGradesForStudent = async (academicId) => {
  const [rows] = await db.execute(
    `SELECT course_id, grade, uploaded_at FROM initial_grades WHERE student_id = ?`,
    [academicId]
  );
  return rows;
};

const saveGrade = async (gradeData) => {
  const {
    studentId,
    courseId,
    grade,
    uploadedBy
  } = gradeData;

  if (!studentId || !courseId || typeof grade !== 'number' || !uploadedBy) {
    throw new Error('Missing or invalid fields in Kafka message');
  }

  await db.execute(
    `INSERT INTO initial_grades (student_id, course_id, grade, uploaded_by)
     VALUES (?, ?, ?, ?)`,
    [
      Number(studentId),
      courseId,
      grade,
      Number(uploadedBy)
    ]
  );

  console.log(`[Kafka CONSUMER] Saved grade to DB:`, gradeData);
};

module.exports = { getGradesForStudent, saveGrade };
