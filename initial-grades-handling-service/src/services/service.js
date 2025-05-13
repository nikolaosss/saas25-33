const db = require('../db');

const saveInitialGrades = async (grades) => {
  const insertions = grades.map(g =>
    db.execute(
      `INSERT INTO initial_grades (student_id, course_id, grade, uploaded_by)
       VALUES (?, ?, ?, ?)`,
      [g.studentId, g.courseId, g.grade, g.uploadedBy]
    )
  );

  await Promise.all(insertions);
  return grades.length;
};

module.exports = { saveInitialGrades };
