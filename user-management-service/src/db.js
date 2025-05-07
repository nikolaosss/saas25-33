const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  multipleStatements: true,
});

module.exports = dbConnection;