CREATE TABLE Customers
(
	CustomerID   INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(100)
);

CREATE TABLE Employees
(
	EmployeeID    INT PRIMARY KEY AUTO_INCREMENT, 
    EmployeeName  VARCHAR(100),
    Salary        DECIMAL(8,2)
);

CREATE TABLE Country
(
	CountryID   INT PRIMARY KEY AUTO_INCREMENT,
    CountryName varchar(50)
);

CREATE TABLE Orders
(
	OrderID      INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID   INT,
    ProductName  VARCHAR(50),
    Price        DECIMAL(6,2),
    EmployeeID   INT,
    CountryID    INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (CountryID) REFERENCES Country(CountryID)
);

-- 1)Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary of all employees.

SELECT EmployeeName, Salary
FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);

-- 2)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order.

SELECT Customers.CustomerName, SUM(Orders.Price) AS TotalRevenue
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Customers.CustomerName
ORDER BY TotalRevenue DESC;

-- 3)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than $10,000.

SELECT Customers.CustomerName, SUM(Orders.Price) AS TotalRevenue
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Customers.CustomerName
HAVING TotalRevenue > 10000
ORDER BY TotalRevenue DESC;

-- 4)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than the average revenue generated by all customers.

SELECT 
    c.CustomerName,
    SUM(o.Price) AS TotalRevenue
FROM 
    Customers c
JOIN 
    Orders o ON c.CustomerID = o.CustomerID
GROUP BY 
    c.CustomerName
HAVING 
    SUM(o.Price) > (SELECT AVG(TotalRevenue) FROM (SELECT SUM(Price) AS TotalRevenue FROM Orders GROUP BY CustomerID) AS AvgRevenue)
ORDER BY 
    TotalRevenue DESC;

-- 5)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than the average revenue generated by all customers, and the customer is from the "USA" or "Canada".

 SELECT C.CustomerName,SUM(O.Price) AS total_revenue FROM Customers C
 INNER JOIN Orders O ON O.CustomerID = C.CustomerID
 INNER JOIN Country CO ON CO.CountryID = O.CountryID
 WHERE CO.CountryName = 'USA' OR CO.CountryName = 'Canada'
 GROUP BY C.CustomerName 
 HAVING total_revenue > (SELECT 
							AVG(TotalRevenue)FROM 
							(SELECT SUM(Price) AS TotalRevenue FROM Orders GROUP BY CustomerID)AS TOTAL
						);

-- 6)Write a SQL query to retrieve the names of all employees who have made sales greater than $50,000 in the "orders" table.

SELECT 
    e.EmployeeName
FROM 
    Employees e
JOIN 
    Orders o ON e.EmployeeID = o.EmployeeID
GROUP BY 
    e.EmployeeName
HAVING 
    SUM(o.Price) > 50000;

-- 7)Write a SQL query to retrieve the names of all employees who have made sales greater than the average sales of all employees in the "orders" table, sorted by sales in descending order.

SELECT 
    e.EmployeeName,
    SUM(o.Price) AS TotalSales
FROM 
    Employees e
JOIN 
    Orders o ON e.EmployeeID = o.EmployeeID
GROUP BY 
    e.EmployeeName
HAVING 
    SUM(o.Price) > (SELECT AVG(TotalSales) FROM (SELECT SUM(Price) AS TotalSales FROM Orders GROUP BY EmployeeID) AS AvgSales)
ORDER BY 
    TotalSales DESC;

-- 8)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than $5,000.

SELECT 
    c.CustomerName,
    SUM(o.Price) AS TotalRevenue
FROM 
    Customers c
JOIN 
    Orders o ON c.CustomerID = o.CustomerID
JOIN 
    Country cn ON c.CountryID = cn.CountryID
WHERE 
    cn.CountryName = 'USA'
GROUP BY 
    c.CustomerName
HAVING 
    TotalRevenue > 5000
ORDER BY 
    TotalRevenue DESC;

-- 9)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than the average revenue generated by all customers from the "USA".

 SELECT C.CustomerName,SUM(O.Price) AS total_revenue FROM Customers C
 INNER JOIN Orders O ON O.CustomerID = C.CustomerID
 INNER JOIN Country CO ON CO.CountryID = O.CountryID
 WHERE CO.CountryName = 'USA'
 GROUP BY C.CustomerName
 HAVING total_revenue > (SELECT 
							AVG(TotalRevenue)FROM 
							(SELECT SUM(Price) AS TotalRevenue FROM Orders GROUP BY CustomerID)AS TOTAL
						)
ORDER BY total_revenue DESC;

-- 10)Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than the average revenue generated by all customers, and the customer has made at least 2 orders.

SELECT C.CustomerName,SUM(O.Price) AS total_revenue FROM Customers C
 INNER JOIN Orders O ON O.CustomerID = C.CustomerID
 INNER JOIN Country CO ON CO.CountryID = O.CountryID
 WHERE CO.CountryName = 'USA' 
 GROUP BY C.CustomerName
 HAVING COUNT(o.OrderID) >= 2 AND total_revenue > (SELECT 
							AVG(TotalRevenue)FROM 
							(SELECT SUM(Price) AS TotalRevenue FROM Orders GROUP BY CustomerID)AS TOTAL
						)
 ORDER BY total_revenue DESC;