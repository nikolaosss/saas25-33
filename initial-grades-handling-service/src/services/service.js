const db = require('../db');

const clean = (v) => v === undefined ? null : v;

const saveInitialGrades = async (grades) => {
  const insertions = grades.map(g =>
    db.execute(
      `INSERT INTO initial_grades (
        student_id, name, email, declaration_period,
        course_id, grade_scale, final_grade,
        q01, q02, q03, q04, q05, q06, q07, q08, q09, q10,
        uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        clean(g.studentId), clean(g.name), clean(g.email), clean(g.declarationPeriod),
        clean(g.courseId), clean(g.gradeScale), clean(g.finalGrade),
        clean(g.q01), clean(g.q02), clean(g.q03), clean(g.q04), clean(g.q05),
        clean(g.q06), clean(g.q07), clean(g.q08), clean(g.q09), clean(g.q10),
        clean(g.uploadedBy)
      ]
    )
  );

  await Promise.all(insertions);
};


module.exports = { saveInitialGrades };
