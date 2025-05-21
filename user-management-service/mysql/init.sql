CREATE DATABASE IF NOT EXISTS users;

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

