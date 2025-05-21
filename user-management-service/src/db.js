const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-user-management',
  user: 'root',
  password: 'root',
  database: 'users',
  multipleStatements: true,
});

module.exports = dbConnection;