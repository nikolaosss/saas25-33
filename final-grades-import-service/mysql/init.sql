CREATE DATABASE IF NOT EXISTS grades;

USE grades;

CREATE TABLE IF NOT EXISTS final_grades (
  id INT NOT NULL AUTO_INCREMENT,
  
  student_id VARCHAR(20) NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  declaration_period VARCHAR(50),
  course_id VARCHAR(50),
  grade_scale VARCHAR(10),
  final_grade FLOAT,

  q01 INT, q02 INT, q03 INT, q04 INT, q05 INT,
  q06 INT, q07 INT, q08 INT, q09 INT, q10 INT,

  uploaded_by INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);