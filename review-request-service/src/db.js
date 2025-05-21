const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-review-request',
  user: 'root',
  password: 'root',
  database: 'review_requests_db',
  multipleStatements: true,
});

module.exports = dbConnection;