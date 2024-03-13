-- 1)Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, along with the total number of orders they have made.

CREATE TABLE customers_task1 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE
);

SELECT customer_id, COUNT(*) AS total_orders
FROM orders_task1
GROUP BY customer_id
ORDER BY total_orders DESC
LIMIT 10;

-- 2)Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products in the "order_details" table, sorted by the amount sold in descending order.

CREATE TABLE employees_task2 (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task2 (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    order_date DATE
);

CREATE TABLE order_details_task2 (
	id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    price DECIMAL(10, 2) NOT NULL
);

SELECT e.id AS employee_id, e.name AS employee_name, SUM(od.price) AS total_sales
FROM employees_task2 e
JOIN orders_task2 o 
ON o.employee_id = e.id
JOIN order_details_task2 od 
ON od.order_id = o.order_id
GROUP BY e.id
HAVING total_sales > 100000
ORDER BY total_sales DESC;

-- 3)Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days.
 
CREATE TABLE customers_task3 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task3 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task3(customer_id)
);

CREATE TABLE order_details_task3 (
    detail_id INT PRIMARY KEY,
    order_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_task3(order_id)
);

SELECT
    c.customer_name,
    SUM(od.price) AS total_spent_all_orders,
    SUM(CASE WHEN o.order_date >= CURDATE() - INTERVAL 30 DAY THEN od.price ELSE 0 END) AS total_spent_last_30_days
FROM
    customers_task3 c
INNER JOIN
    orders_task3 o ON c.customer_id = o.customer_id
INNER JOIN
    order_details_task3 od ON o.order_id = od.order_id
GROUP BY
    c.customer_name;


-- 4)Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary of all employees in the "employees" table, sorted by salary in descending order.

CREATE TABLE employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- 5)Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, but have not made any orders in the last 90 days.

CREATE TABLE customers_task5 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task5 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task5(customer_id)
);

SELECT DISTINCT
    c.customer_name
FROM
    customers_task5 c
LEFT JOIN
    orders_task5 o ON c.customer_id = o.customer_id AND o.order_date >= CURDATE() - INTERVAL 90 DAY
WHERE
    o.order_id IS NULL;


-- 6)Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the minimum salary of their department in the "employees" table, sorted by department ID and then by salary in descending order.

CREATE TABLE departments_task6 (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE employees_task6 (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments_task6(department_id)
);

SELECT
    e.name,
    e.salary
FROM
    employees_task6 e
INNER JOIN
    departments_task6 d ON e.department_id = d.department_id
WHERE
    e.salary > (
        SELECT
            MIN(salary)
        FROM
            employees_task6
        WHERE
            department_id = e.department_id
    )
ORDER BY
    e.department_id, e.salary DESC;


-- 7)Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table, sorted by department ID and then by salary in descending order.

CREATE TABLE departments_task7 (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE employees_task7 (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments_task6(department_id)
);

SELECT
	e.name,
    e.salary,
    d.department_name,
	ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS salary_row_number
FROM employees_task7 e 
INNER JOIN departments_task7 d
ON e.department_id = d.department_id;

-- 8)Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, but have not made any orders for products in the "products" table with a price greater than $100.

CREATE TABLE customers_task8 (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50) NOT NULL
);

CREATE TABLE products_task8 (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    product_description TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders_task8 (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers_task8(customer_id)
); 

CREATE TABLE orders_details_task8 (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orders_task8(order_id),
	FOREIGN KEY (product_id) REFERENCES products_task8(product_id)
);

SELECT c.customer_id, c.customer_name, p.product_name, p.product_price
FROM customers_task8 c
INNER JOIN orders_task8 o
ON c.customer_id = o.customer_id
INNER JOIN orders_details_task8 od
ON od.order_id = o.order_id
INNER JOIN products_task8 p
ON p.product_id = od.product_id
WHERE p.product_price <= 100;

-- 9)Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, along with the total amount they have spent on all orders and the average amount they have spent per order.

SELECT o.order_id, SUM(od.quantity * p.product_price) AS total_price
FROM orders_task8 o
LEFT JOIN orders_details_task8 od
ON od.order_id = o.order_id
LEFT JOIN products_task8 p
ON p.product_id = od.product_id
GROUP BY o.order_id;

-- 10)Write a SQL query to retrieve the names of all products in the "products" table that have been ordered by customers in more than one country, along with the names of the countries where the products have been ordered.

CREATE TABLE products_task10 (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task10 (
    order_id INT PRIMARY KEY,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE order_details_task10 (
    detail_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

SELECT p.product_name, COUNT(DISTINCT o.country) AS num_countries, GROUP_CONCAT(DISTINCT o.country ORDER BY o.country) AS countries_ordered_in
FROM products_task10 p
JOIN order_details_task10 od ON p.product_id = od.product_id
JOIN orders_task10 o ON od.order_id = o.order_id
GROUP BY p.product_id
HAVING num_countries > 1;














