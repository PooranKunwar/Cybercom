-- CASE 1

CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255)
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255),
    department_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255),
    department_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- 1)Write a query to return the names of all employees who work in the 'Sales' department.

SELECT name
FROM Employees
WHERE department_id = (
    SELECT department_id
    FROM Departments
    WHERE department_name = 'Sales'
);

-- 2)Write a query to return the total number of employees in each department, ordered by department name.

SELECT d.department_name, COUNT(e.employee_id) AS total_employees
FROM Departments d
LEFT JOIN Employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- 3)Write a query to return the average salary for each department, ordered by department name.

SELECT d.department_name, AVG(e.salary) AS avg_salary
FROM Departments d
LEFT JOIN Employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- 4)Write a query to return the top 10% of highest paid employees, ordered by salary.

SELECT *
FROM (
    SELECT *, NTILE(10) OVER (ORDER BY salary DESC) AS salary_percentile
    FROM Employees
) AS emp_with_percentile
WHERE salary_percentile = 1;

-- 5)Write a query to return the salary of each employee for their latest salary entry.

SELECT e.name, s.salary
FROM Employees e
JOIN (
    SELECT employee_id, MAX(date) AS latest_date
    FROM Salaries
    GROUP BY employee_id
) AS latest_salary_date ON e.employee_id = latest_salary_date.employee_id
JOIN Salaries s ON e.employee_id = s.employee_id AND latest_salary_date.latest_date = s.date;

