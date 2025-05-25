const xlsx = require("xlsx");
const db = require("./src/db"); // DB connection (mysql2/promise)

const main = async () => {
  const workbook = xlsx.readFile("grades.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { range: 2 }); // Skip first 2 rows

  for (const row of rows) {
    try {
      const studentId = row["Αριθμός Μητρώου"];
      const name = row["Ονοματεπώνυμο"];
      const email = row["Ακαδημαϊκό E-mail"];
      const declarationPeriod = row["Περίοδος δήλωσης"];
      const courseId = row["Τμήμα Τάξης"];
      const gradeScale = row["Κλίμακα βαθμολόγησης"];
      const grade = parseFloat(row["Βαθμολογία"]);

      // Q01–Q10
      const q01 = row["Q01"] || null;
      const q02 = row["Q02"] || null;
      const q03 = row["Q03"] || null;
      const q04 = row["Q04"] || null;
      const q05 = row["Q05"] || null;
      const q06 = row["Q06"] || null;
      const q07 = row["Q07"] || null;
      const q08 = row["Q08"] || null;
      const q09 = row["Q09"] || null;
      const q10 = row["Q10"] || null;

      // W01–W10
      const w01 = row["W01"] || null;
      const w02 = row["W02"] || null;
      const w03 = row["W03"] || null;
      const w04 = row["W04"] || null;
      const w05 = row["W05"] || null;
      const w06 = row["W06"] || null;
      const w07 = row["W07"] || null;
      const w08 = row["W08"] || null;
      const w09 = row["W09"] || null;
      const w10 = row["W10"] || null;

      await db.execute(
        `INSERT INTO initial_grades (
          student_id, name, email, declaration_period, course_id, grade_scale, grade,
          q01, q02, q03, q04, q05, q06, q07, q08, q09, q10,
          w01, w02, w03, w04, w05, w06, w07, w08, w09, w10,
          uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          studentId, name, email, declarationPeriod, courseId, gradeScale, grade,
          q01, q02, q03, q04, q05, q06, q07, q08, q09, q10,
          w01, w02, w03, w04, w05, w06, w07, w08, w09, w10,
          1 // uploaded_by
        ]
      );

      console.log(`✅ Inserted: ${studentId} - ${name}`);
    } catch (error) {
      console.error(`❌ Failed to insert ${row["Αριθμός Μητρώου"]}:`, error.message);
    }
  }

  console.log("📥 Import complete.");
  process.exit();
};

main();
