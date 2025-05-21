const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'mysql-review-reply',
  user: 'root',
  password: 'root',
  database: 'review_replies_db',
  multipleStatements: true,
});

module.exports = dbConnection;