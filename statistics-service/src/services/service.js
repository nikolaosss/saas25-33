const db = require('../db');

async function updateStatistics(courseId, grade) {
  // 1. Validation
   console.log(`[STATISTICS] Updating: ${courseId}, grade: ${grade}`);
  if (grade < 0 || grade > 10) throw new Error('Grade must be 0-10');

  // 2. Business Logic
  const [existing] = await db.query(
    'SELECT count, total FROM statistics WHERE courseId = ?', 
    [courseId]
  );

  if (existing.length > 0) {
    // Update existing record
    const { count, total } = existing[0];
    const newCount = count + 1;
    const newTotal = total + grade;
    
    await db.query(
      'UPDATE statistics SET count = ?, total = ?, average = ? WHERE courseId = ?',
      [newCount, newTotal, newTotal/newCount, courseId]
    );
  } else {
    // Insert new record
    await db.query(
      'INSERT INTO statistics (courseId, count, total, average) VALUES (?, ?, ?, ?)',
      [courseId, 1, grade, grade]
    );
  }
}

module.exports = { updateStatistics };