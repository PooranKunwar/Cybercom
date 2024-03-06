-- CASE 1

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP
);

-- 1)Write a query that selects all customers whose email address ends with "@gmail.com".

SELECT *
FROM customers
WHERE email LIKE '%@gmail.com';

-- 2)Write a query that selects the customer with the earliest created_at date.
 
SELECT *
FROM customers
WHERE created_at = (
    SELECT MIN(created_at)
    FROM customers
);

-- 3)Write a query that selects the name and email of customers who were created on or after January 3, 2022.
 
SELECT name, email
FROM customers
WHERE created_at >= '2022-01-03';

-- 4)Write a query that updates the email address of the customer with id=5 to "davidkim@gmail.com".
 
UPDATE customers
SET email = 'davidkim@gmail.com'
WHERE id = 5;

-- 5)Write a query that deletes the customer with id=2.

DELETE FROM customers
WHERE id = 2;

-- 6)Write a query that calculates the total number of customers in the "customers" table.

SELECT COUNT(*) AS total_customers
FROM customers;


-- CASE 2

CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

-- Write a query to retrieve the name and price of all items in the inventory where the quantity is greater than 0 and the category is 'electronics', sorted in descending order by price.

SELECT name, price
FROM inventory
WHERE quantity > 0 AND category = 'electronics'
ORDER BY price DESC;

-- CASE 3

-- Write a query to retrieve the total sales for each month in the year 2021, sorted in ascending order by month.

SELECT 
    EXTRACT(MONTH FROM date) AS month,
    SUM(total_price) AS total_sales
FROM 
    sales
WHERE 
    EXTRACT(YEAR FROM date) = 2021
GROUP BY 
    EXTRACT(MONTH FROM date)
ORDER BY 
    month;
