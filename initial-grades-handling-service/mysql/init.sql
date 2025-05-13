-- === Create database and user ===
CREATE DATABASE IF NOT EXISTS grades;

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'mysqlnikolaos';
GRANT ALL PRIVILEGES ON grades.* TO 'user'@'%';
FLUSH PRIVILEGES;

-- === Use the database ===
USE grades;

-- === Create grades table ===
CREATE TABLE IF NOT EXISTS ugrades (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id VARCHAR(20) NOT NULL,
  grade FLOAT NOT NULL,
  uploaded_by INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
