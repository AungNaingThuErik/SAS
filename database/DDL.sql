CREATE TABLE Teacher (
    name varchar(225),
    email varchar(225),
);

CREATE TABLE Student (
    name varchar(225),
    email varchar(225),
);

CREATE TABLE Subject (
    subjectCode varchar(25),
    name varchar(225),
);

CREATE TABLE Class (
    classCode varchar(25),
    name varchar(225),
);


INSERT INTO Teacher ( name, email) VALUES
('Teacher 1', 'teacher1@gmail.com'),
('Teacher 2', 'teacher2@gmail.com'),
('Teacher 3', 'teacher3@gmail.com'),
('Teacher 4', 'teacher4@gmail.com');

INSERT INTO Student ( name, email) VALUES
('Student 1', 'student1@gmail.com'),
('Student 2', 'student2@gmail.com'),
('Student 3', 'student3@gmail.com'),
('Student 4', 'student4@gmail.com');

INSERT INTO Subject ( subjectCode, name) VALUES
('ENG', 'English'),
('MATHS', 'Mathematics'),
('PSYCH', 'Psychology'),
('BIO', 'BIOLOGY');

INSERT INTO Class ( classCode, name) VALUES
('C1-1', 'C1 Integrity'),
('P1-1', 'P1 Integrity'),
('A1-1', 'A1 Integrity'),
('E1-1', 'E1 Integrity');