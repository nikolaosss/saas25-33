// src/services/service.js

const db = require('../db'); // Υποθέτω ότι έχεις σύνδεση MySQL ή Sequelize

const processGrade = async ({ courseId, grade }) => {
  if (!courseId || grade === undefined) {
    throw new Error('Missing courseId or grade');
  }

  // Πάρε τα στατιστικά για το course
  const [existing] = await db.query(
    'SELECT count, total FROM statistics WHERE courseId = ?',
    [courseId]
  );

  if (existing.length > 0) {
    const stat = existing[0];
    const newCount = stat.count + 1;
    const newTotal = stat.total + grade;
    const newAvg = newTotal / newCount;

    await db.query(
      'UPDATE statistics SET count = ?, total = ?, average = ? WHERE courseId = ?',
      [newCount, newTotal, newAvg, courseId]
    );
  } else {
    await db.query(
      'INSERT INTO statistics (courseId, count, total, average) VALUES (?, ?, ?, ?)',
      [courseId, 1, grade, grade]
    );
  }
};

module.exports = { processGrade };
