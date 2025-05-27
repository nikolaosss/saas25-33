const db = require('../db');
const clean = (v) => (v === undefined ? null : v);

const updateStatistics = async (courseId, finalGrade, questions) => {
  if (!courseId || typeof finalGrade !== 'number') {
    throw new Error('Invalid courseId or grade');
  }

  const [existing] = await db.execute(
    'SELECT * FROM statistics WHERE courseId = ?',
    [clean(courseId)]
  );

  if (existing.length > 0) {
    const row = existing[0];
    const newCount = row.count + 1;
    const newTotal = row.total + finalGrade;
    const newAvg = newTotal / newCount;

    const updates = {
      count: newCount,
      total: newTotal,
      average: newAvg
    };

   for (let i = 1; i <= 10; i++) {
      const key = `q${i.toString().padStart(2, '0')}`; // q01, q02, ..., q10
      const qVal = questions[key];
      if (typeof qVal === 'number') {
        const tKey = `${key}_total`;
        const aKey = `${key}_avg`;
        const newT = (row[tKey] || 0) + qVal;
        const newA = newT / newCount;
        updates[tKey] = newT;
        updates[aKey] = newA;
      }
    }


    const setClause = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(updates), courseId];

    await db.execute(`UPDATE statistics SET ${setClause} WHERE courseId = ?`, values);

  } else {
    const insertColumns = ['courseId', 'count', 'total', 'average'];
    const insertValues = [courseId, 1, finalGrade, finalGrade];

    for (let i = 1; i <= 10; i++) {
      const key = `q${i.toString().padStart(2, '0')}`;
      const qVal = questions[key];
      if (typeof qVal === 'number') {
        insertColumns.push(`${key}_total`, `${key}_avg`);
        insertValues.push(qVal, qVal);
      }
    }


    const cols = insertColumns.join(', ');
    const placeholders = insertColumns.map(() => '?').join(', ');

    await db.execute(
      `INSERT INTO statistics (${cols}) VALUES (${placeholders})`,
      insertValues
    );
  }
};

module.exports = { updateStatistics };
