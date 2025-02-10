--  Create the database (optional)
CREATE DATABASE PeopleDB;
USE PeopleDB;

-- Create the table
CREATE TABLE People (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    city VARCHAR(100),
    occupation VARCHAR(100)
);

-- Insert data into the table
INSERT INTO People (id, name, age, city, occupation) VALUES
(1, 'Bob Smith', 34, 'Los Angeles', 'Software Engineer'),
(2, 'Alice Johnson', 28, 'New York', 'Graphic Designer'),
(3, 'Charlie Brown', 22, 'Chicago', 'Photographer'),
(4, 'Diana Prince', 30, 'Miami', 'Marketing Specialist'),
(5, 'Ethan Hunt', 40, 'San Francisco', 'Project Manager'),
(6, 'Fiona Gallagher', 26, 'Seattle', 'Web Developer'),
(7, 'George King', 31, 'Boston', 'Financial Analyst'),
(8, 'Hannah Lee', 24, 'Austin', 'Data Scientist'),
(9, 'Isaac Newton', 39, 'Denver', 'Physicist'),
(10, 'Julia Roberts', 37, 'Phoenix', 'Actress'),
(11, 'Kevin Hart', 42, 'Las Vegas', 'Comedian'),
(12, 'Laura Croft', 29, 'Orlando', 'Adventure Blogger'),
(13, 'Michael Scott', 36, 'Philadelphia', 'Regional Manager'),
(14, 'Natalie Portman', 32, 'San Diego', 'Actress'),
(15, 'Oliver Twist', 19, 'New Orleans', 'Student'),
(16, 'Paula Abdul', 45, 'Atlanta', 'Choreographer'),
(17, 'Quentin Tarantino', 58, 'Los Angeles', 'Director'),
(18, 'Rita Hayworth', 65, 'Tucson', 'Retired'),
(19, 'Sammy Davis Jr.', 54, 'Houston', 'Singer'),
(20, 'Tina Fey', 51, 'Chicago', 'Writer');
