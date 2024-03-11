-- CASE 1

CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- 1)Write a query to find all books published in the year 2020.

SELECT *
FROM books
WHERE YEAR(publication_date) = 2020;

-- 2)Write a query to find the name of the author who has written the most number of books.

SELECT a.name
FROM authors a
JOIN books b ON a.id = b.author_id
GROUP BY a.name
ORDER BY COUNT(b.id) DESC
LIMIT 1;

-- 3)Write a query to find the name of the category with the most number of books.

SELECT bc.name
FROM book_categories bc
JOIN book_category_mappings bcm ON bc.id = bcm.category_id
GROUP BY bc.name
ORDER BY COUNT(bcm.book_id) DESC
LIMIT 1;

-- 4)Write a query to find the name of the author who has written the most number of books in the category "fiction".

SELECT bc.name
FROM book_categories bc
JOIN book_category_mappings bcm ON bc.id = bcm.category_id
GROUP BY bc.name
ORDER BY COUNT(bcm.book_id) DESC
LIMIT 1;


-- 5)Write a query to find the titles of the top 5 most popular books. The popularity of a book is defined as the number of times it has been borrowed by customers. Assume that information about book borrowings is stored in a separate table called book_borrowings with the following columns:

CREATE TABLE customers
(
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(50)
)

CREATE TABLE book_borrowings
(
	 id 		 INT AUTO_INCREMENT PRIMARY KEY
    ,book_id     INT
    ,customer_id INT 
    ,borrow_date DATE
    ,FOREIGN KEY(book_id) REFERENCES books(id)
    ,FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
)

SELECT B.title,COUNT(bb.id) AS borrow_count FROM Book B 
INNER JOIN book_borrowings bb ON b.id = bb.book_id
GROUP BY b.id
ORDER BY borrow_count DESC
LIMIT 5;