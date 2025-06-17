// src/kafka/consumers/finalGradesConsumer.js
const { kafka } = require('../config/kafka');
const db        = require('../db');

async function startFinalGradesConsumer() {
  const consumer = kafka.consumer({ groupId: 'initial-grades-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'final-grades', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const rows = JSON.parse(message.value.toString());   // array από grades
        console.log(`[KAFKA] 📨 final-grades batch size=${rows.length}`);

        const conn = await db.getConnection();
        try {
          await conn.beginTransaction();

          // 1️⃣  για κάθε grade → upsert + mark is_final = 1
          const sql = `
            INSERT INTO initial_grades
              (student_id,name,email,declaration_period,course_id,grade_scale,final_grade,uploaded_by,is_final)
            VALUES ?
            ON DUPLICATE KEY UPDATE
              final_grade = VALUES(final_grade),
              grade_scale = VALUES(grade_scale),
              declaration_period = VALUES(declaration_period),
              is_final = 1
          `;

          const values = rows.map(g => [
            g.studentId,
            g.name,
            g.email,
            g.declarationPeriod,
            g.courseId,
            g.gradeScale,
            g.finalGrade,
            g.uploadedBy || 0,
            1,
          ]);

          await conn.query(sql, [values]);
          await conn.commit();
          console.log('✅ initial_grades updated with final grades');
        } catch (err) {
          await conn.rollback();
          throw err;
        } finally {
          conn.release();
        }
      } catch (err) {
        console.error('[CONSUMER error]', err.message);
      }
    },
  });
}

module.exports = { startFinalGradesConsumer };
