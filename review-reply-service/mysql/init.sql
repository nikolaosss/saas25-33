
CREATE DATABASE IF NOT EXISTS review_replies_db;
USE review_replies_db;

CREATE TABLE IF NOT EXISTS review_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  academic_id INT NOT NULL,
  course_id VARCHAR(46) NOT NULL,
  initial_grade INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  status VARCHAR(46) NOT NULL,
  created_at DATE NOT NULL,
  reply_text VARCHAR(255) NOT NULL,
  reply_grade INT NOT NULL,
  instructor_id INT NOT NULL,
  replied_at DATE NOT NULL
);
