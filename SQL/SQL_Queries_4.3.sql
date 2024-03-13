-- CASE 1

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 1)Create a new user with the following information:
-- name: John Doe
-- email: john.doe@example.com
-- password: 123456
-- created_at: current timestamp
-- updated_at: current timestamp

INSERT INTO users (name, email, password, created_at, updated_at)
VALUES ('John Doe', 'john.doe@example.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2)Retrieve the names and email addresses of all users who have placed at least one order.

SELECT u.name, u.email
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;

-- 3)Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
 
SELECT u.id, u.name, SUM(o.amount) AS total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_amount DESC;

-- 4)Retrieve the email address of the user who has placed the most orders.

SELECT u.email
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email
HAVING COUNT(o.id) = (
    SELECT COUNT(id) AS num_orders
    FROM orders
    GROUP BY user_id
    ORDER BY num_orders DESC
    LIMIT 1
);

-- 5)Retrieve the user IDs and the total amount of orders placed by users who have placed at least one order and whose total amount of orders exceeds $100.

SELECT user_id, SUM(amount) AS total_amount_of_orders
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 100;

-- 6)Retrieve the number of users who have not placed any orders.

SELECT COUNT(*) AS num_users_without_orders
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);

-- 7)Update the user with ID 1 to change their email address to "jane.doe@example.com".

UPDATE users
SET email = 'jane.doe@example.com'
WHERE id = 1;

-- 8)Delete all orders placed by users whose email address contains the string "test".

DELETE FROM orders
WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%test%');

-- 9)Retrieve the total amount of orders placed on each day of the current week, grouped by day.

SELECT DATE(created_at) AS order_date, SUM(amount) AS total_amount
FROM orders
WHERE YEARWEEK(created_at) = YEARWEEK(NOW())
GROUP BY order_date;

-- 10)Retrieve the IDs and email addresses of users who have placed an order in the current year and whose email address is in the format "example.com".

SELECT u.id, u.email
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE EXTRACT(YEAR FROM o.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
AND u.email LIKE '%@example.com%';
