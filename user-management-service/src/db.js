const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-user',
  user: 'user',
  password: 'mysqlnikolaos',
  database: 'users',
  multipleStatements: true,
});

module.exports = dbConnection;