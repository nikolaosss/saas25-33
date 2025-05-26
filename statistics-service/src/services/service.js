const db = require('../db');

const clean = (v) => (v === undefined ? null : v);

const updateStatistics = async (courseId, grade) => {
  if (!courseId || typeof grade !== 'number' || grade < 0 || grade > 10) {
    throw new Error('Invalid courseId or grade');
  }

  const [existing] = await db.execute(
    'SELECT count, total FROM statistics WHERE courseId = ?',
    [clean(courseId)]
  );

  if (existing.length > 0) {
    const { count, total } = existing[0];
    const newCount = count + 1;
    const newTotal = total + grade;
    const average = newTotal / newCount;

    await db.execute(
      'UPDATE statistics SET count = ?, total = ?, average = ? WHERE courseId = ?',
      [newCount, newTotal, average, courseId]
    );
  } else {
    await db.execute(
      'INSERT INTO statistics (courseId, count, total, average) VALUES (?, ?, ?, ?)',
      [courseId, 1, grade, grade]
    );
  }
};

module.exports = { updateStatistics };
