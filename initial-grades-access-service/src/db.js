const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-initial-grades-access',
  user: 'root',
  password: 'root',
  database: 'grades',
  multipleStatements: true,
});

module.exports = dbConnection;