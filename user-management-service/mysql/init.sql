CREATE DATABASE IF NOT EXISTS users;
CREATE DATABASE IF NOT EXISTS grades;
CREATE DATABASE IF NOT EXISTS statistics; 

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'mysqlnikolaos';
GRANT ALL PRIVILEGES ON users.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON grades.* TO 'user'@'%';
FLUSH PRIVILEGES;

USE users;

CREATE TABLE IF NOT EXISTS uss (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  role VARCHAR(45) NOT NULL,
  academic_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC),
  UNIQUE INDEX academic_id_UNIQUE (academic_id ASC)
) ENGINE = InnoDB;

-- === Sample users ===
INSERT INTO uss (email, password, name, role, academic_id)
VALUES ('nick@', 'snik', 'Nick', 'student', 123);

INSERT INTO uss (email, password, name, role, academic_id)
VALUES ('teach', 'teach', 'teach', 'professor', 321);


USE grades;

CREATE TABLE IF NOT EXISTS initial_grades (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id VARCHAR(20) NOT NULL,
  grade FLOAT NOT NULL,
  uploaded_by INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS statistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseId VARCHAR(50) NOT NULL,
  count INT DEFAULT 0,
  total FLOAT DEFAULT 0,
  average FLOAT DEFAULT 0
);

