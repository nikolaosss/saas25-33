const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql',
  user: 'user',
  password: 'mysqlnikolaos',
  database: 'statistics',
  multipleStatements: true,
});

module.exports = dbConnection;