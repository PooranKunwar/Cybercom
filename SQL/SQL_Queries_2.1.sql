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
