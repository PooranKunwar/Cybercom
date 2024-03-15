-- Create the employees table

CREATE TABLE employees (
	id int PRIMARY KEY,
	name varchar(255),
    per_hour_salary int DEFAULT 0,
    working_hour int DEFAULT 0,
    total_salary int DEFAULT 0
);

-- create trigger before inserting

DELIMITER //

CREATE TRIGGER 	set_total_salary
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
 SET new.total_salary = new.per_hour_salary * new.working_hour;
END //

DELIMITER ;

INSERT INTO employees (id, name, per_hour_salary, working_hour)
VALUES
    (1, 'John', 20, 8);

-- create trigger before updating

DELIMITER //

CREATE TRIGGER 	update_total_salary
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
 SET new.total_salary = new.per_hour_salary * new.working_hour;
END //

DELIMITER ;

-- create trigger after delete

CREATE TABLE employees_log (
	id int,
    tablename text,
  	operation text,
    delete_time TIMESTAMP
);

DELIMITER //

CREATE TRIGGER delete_employees_trigger
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employees_log (id, tablename, operation, delete_time)
    VALUES (OLD.id, 'employees', 'Delete', CURRENT_TIMESTAMP);
END //

DELIMITER ;

