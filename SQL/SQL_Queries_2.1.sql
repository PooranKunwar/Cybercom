-- 1)Create a database structure for employee leave application. It should include all the employee's information as well as their leave information. 

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(256),
    LastName VARCHAR(256),
    Email VARCHAR(256),
    Department VARCHAR(256)
);

CREATE TABLE LeaveTypes (
    LeaveTypeID INT PRIMARY KEY IDENTITY,
    LeaveTypeName VARCHAR(256)
);

CREATE TABLE LeaveApplications (
    LeaveApplicationID INT PRIMARY KEY,
    EmployeeID INT,
    LeaveTypeID INT,
    StartDate DATE,
    EndDate DATE,
    Reason TEXT,
    Status VARCHAR(256),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (LeaveTypeID) REFERENCES LeaveTypes(LeaveTypeID)
);

-- 2)Write an SQL query to report the movies with an odd-numbered ID and a description that is not "boring". Return the result table ordered by rating in descending order.

SELECT * FROM cinema
WHERE id % 2 != 0 AND description != 'boring'
ORDER BY rating DESC

-- 3)Write an SQL query to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.Note that you must write a single update statement, do not write any select statement for this problem.

UPDATE salary
SET sex = CASE
    WHEN sex = 'f' THEN 'm'
    WHEN sex = 'm' THEN 'f'
    ELSE sex
END;

-- 4)Write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id. Return the result table in any order.

DELETE FROM Person
WHERE id NOT IN (
    SELECT MIN(id)
    FROM Person
    GROUP BY email
);

-- 5)Write an SQL query to report all customers who never order anything. Return the result table in any order.

SELECT c.id, c.name
FROM customers as c 
LEFT JOIN orders as o ON c.Id = o.customerId
WHERE o.Id IS NULL

-- 6)Write an SQL query to create index on the email column.

CREATE INDEX idx_email
ON person (email)

-- 7)Create a database schema for student grade system. It contains student data and their grade of each subject based on the different semester.

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(256),
    LastName VARCHAR(256),
    DateOfBirth DATE
);

CREATE TABLE Subjects (
    SubjectID INT PRIMARY KEY,
    SubjectName VARCHAR(256),
);

CREATE TABLE Semesters (
    SemesterID INT PRIMARY KEY,
    SemesterName VARCHAR(256)
);

CREATE TABLE Grades (
    GradeID INT PRIMARY KEY,
    StudentID INT,
    SubjectID INT,
    SemesterID INT,
    Grade DECIMAL(5, 2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID),
    FOREIGN KEY (SemesterID) REFERENCES Semesters(SemesterID)
);

-- 8)Write an SQL query to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead. Return the result table in any order.

