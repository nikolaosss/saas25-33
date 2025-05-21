const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-statistics',
  user: 'root',
  password: 'root',
  database: 'statistics',
  multipleStatements: true,
});

module.exports = dbConnection;