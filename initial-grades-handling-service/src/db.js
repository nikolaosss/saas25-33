const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'mysql-initial-grades-handling',
  user: 'root',
  password: 'root',
  database: 'grades',
  multipleStatements: true,
  charset: 'utf8mb4',
});

(async () => {
  try {
    const connection = await db.getConnection();
    await connection.query("SET NAMES utf8mb4");
    connection.release();
    console.log("[DB] UTF-8 mode enabled.");
  } catch (err) {
    console.error("[DB Init Error]", err.message);
  }
})();

module.exports = db;
