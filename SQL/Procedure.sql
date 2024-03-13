-- Create the employees table

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    salary DECIMAL(10, 2)
);

-- Insert some random values into the employees table

INSERT INTO employees (name, age, salary) VALUES
('John Doe', 30, 50000.00),
('Jane Smith', 35, 60000.00),
('Michael Johnson', 40, 70000.00),
('Emily Davis', 25, 45000.00),
('Christopher Brown', 45, 80000.00);

-- Create a stored procedure to insert a new employee record

DELIMITER //
CREATE PROCEDURE InsertEmployee (
    IN employee_name VARCHAR(255),
    IN employee_age INT,
    IN employee_salary DECIMAL(10, 2)
)
BEGIN
    INSERT INTO employees (name, age, salary) VALUES (employee_name, employee_age, employee_salary);
END //
DELIMITER ;

CALL InsertEmployee('John Smith', 28, 55000.00);

-- Create a stored procedure to retrieve all employee records

CREATE PROCEDURE GetAllEmployees ()
BEGIN
    SELECT * FROM employees;
END;

CALL GetAllEmployees();

-- Create a stored procedure to update an employee's salary

DELIMITER //
CREATE PROCEDURE UpdateEmployeeSalary (
    IN employee_id INT,
    IN new_salary DECIMAL(10, 2)
)
BEGIN
    UPDATE employees SET salary = new_salary WHERE id = employee_id;
END //
DELIMITER ;

CALL UpdateEmployeeSalary(1, 60000.00);

-- Create a stored procedure to delete an employee record

DELIMITER //
CREATE PROCEDURE DeleteEmployee (
    IN employee_id INT
)
BEGIN
    DELETE FROM employees WHERE id = employee_id;
END //
DELIMITER ;

CALL DeleteEmployee(3);

-- calculates the total number of employees in a department and returns this count as an OUT parameter.

DELIMITER //
CREATE PROCEDURE GetEmployeeCountOut(OUT employee_count INT)
BEGIN
    SELECT COUNT(*) INTO employee_count FROM employees;
END//
DELIMITER ;


CALL GetEmployeeCountOut(@employee_count);
SELECT @employee_count AS employee_count;

-- to view all stored procedures in your MySQL database:

SELECT ROUTINE_NAME
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = 'your_database_name' AND ROUTINE_TYPE = 'PROCEDURE';

-- for drop procedure

DROP PROCEDURE IF EXISTS procedure_name;

-- all operation perform in one stored procedure

DELIMITER //

CREATE PROCEDURE ManageEmployee(
    IN emp_id INT,
    IN emp_name VARCHAR(255),
    IN emp_age INT,
    IN emp_salary DECIMAL(10, 2),
    IN operation VARCHAR(10)
)
BEGIN
    IF operation = 'CREATE' THEN
        INSERT INTO employees (name, age, salary) VALUES (emp_name, emp_age, emp_salary);
    ELSEIF operation = 'READ' THEN
        SELECT * FROM employees WHERE id = emp_id;
    ELSEIF operation = 'UPDATE' THEN
        UPDATE employees SET name = emp_name, age = emp_age, salary = emp_salary WHERE id = emp_id;
    ELSEIF operation = 'DELETE' THEN
        DELETE FROM employees WHERE id = emp_id;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid operation specified';
    END IF;
END//

DELIMITER ;

CALL ManageEmployee(NULL, 'John Doe', 30, 50000.00, 'CREATE');
CALL ManageEmployee(1, NULL, NULL, NULL, 'READ');
CALL ManageEmployee(1, 'Jane Doe', 35, 55000.00, 'UPDATE');
CALL ManageEmployee(1, NULL, NULL, NULL, 'DELETE');
