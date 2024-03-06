-- CASE 1

CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP
);

-- Write a query to retrieve the title and body of the five most recent blog posts, along with the number of comments each post has.

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

-- CASE 2

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);

CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

-- Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022, along with the total number of likes received for each user's posts.

SELECT 
    p.title,
    p.body,
    COUNT(c.id) AS num_comments
FROM 
    blog_posts p
LEFT JOIN 
    blog_comments c ON p.id = c.post_id
GROUP BY 
    p.id, p.title, p.body
ORDER BY 
    p.created_at DESC
LIMIT 
    5;

-- CASE 3

-- Consider a table called "employees" with the following columns: "id", "name", "department", "salary". Write a SQL query to retrieve the names and salaries of all employees in the "sales" department who earn more than $50,000 per year.

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    salary DECIMAL(10, 2)
);

SELECT name, salary
FROM employees
WHERE department = 'sales' AND salary > 50000;


-- CASE 4

-- Consider a table called "orders" with the following columns: "id", "customer_id", "order_date", "total_amount". Write a SQL query to calculate the total amount of orders for each customer, sorted in descending order by total amount.

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2)
);

SELECT 
    customer_id, 
    SUM(total_amount) AS total_order_amount
FROM 
    orders
GROUP BY 
    customer_id
ORDER BY 
    total_order_amount DESC;
