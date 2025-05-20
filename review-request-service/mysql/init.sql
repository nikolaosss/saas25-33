CREATE DATABASE IF NOT EXISTS review_requests_db;
USE review_requests_db;

CREATE TABLE IF NOT EXISTS ReviewRequest (
  id INT AUTO_INCREMENT PRIMARY KEY,
  academic_id INT NOT NULL,
  course_id VARCHAR(46) NOT NULL,
  initial_grade INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  status VARCHAR(46) NOT NULL,
  created_at DATE NOT NULL,
  reply_text VARCHAR(255),
  reply_grade INT,
  instructor_id INT,
  replied_at DATE
);
