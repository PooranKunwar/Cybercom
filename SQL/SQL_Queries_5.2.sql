CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    City VARCHAR(100)
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    City VARCHAR(100)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100),
    Category VARCHAR(100),
    Price DECIMAL(10, 2)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
	ProductID INT,
    EmployeeID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
	,FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    ,FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

--  1)Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, along with the total amount they have spent on all orders. The output should be sorted by the total amount spent in descending order.

SELECT C.Name,SUM(OD.Quantity * P.Price)AS total_amount_spent  FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN OrderDetails OD ON OD.OrderID = O.OrderID
INNER JOIN Products P ON P.ProductID = OD.ProductID
WHERE P.Category = "Electronics"
GROUP BY C.Name
ORDER BY total_amount_spent  DESC;

-- 2)Write a SQL query to retrieve the names of all employees who have sold at least one product in the "Clothing" category, along with the total revenue they have generated from those sales. The output should be sorted by total revenue generated in descending order.

SELECT E.Name,SUM(OD.Quantity * P.Price) AS total_revenue  FROM Employees E
INNER JOIN Orders O ON O.EmployeeID=E.EmployeeID
INNER JOIN OrderDetails OD ON OD.OrderID = O.OrderID
INNER JOIN Products P ON P.ProductID = OD.ProductID
WHERE  P.Category = "Clothing"
GROUP BY E.Name
ORDER BY total_revenue  DESC;

-- 3)Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and "Clothing" categories. The output should only include customers who have ordered products in both categories.

SELECT C.Name FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN OrderDetails OD ON OD.OrderID = O.OrderID
INNER JOIN Products P ON P.ProductID = OD.ProductID
WHERE P.Category = "Electronics" OR  P.Category = "Clothing"
GROUP BY C.Name
HAVING COUNT(DISTINCT p.Category) = 2;

-- 4)Write a SQL query to retrieve the names of all employees who have sold at least one product to a customer who has a shipping address in the same city as the employee. The output should only include employees who have made at least one such sale.

SELECT E.Name FROM Employees E
INNER JOIN Orders O ON O.EmployeeID=E.EmployeeID
INNER JOIN Customers C ON O.CustomerID = C.CustomerID
WHERE E.City = C.City;

-- 5)Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, but have never placed an order for products in the "Clothing" category.

SELECT distinct C.Name FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN Products P ON P.ProductID = O.ProductID
WHERE p.Category = 'Electronics' AND c.CustomerID NOT IN(SELECT C.CustomerID FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN Products P ON P.ProductID = O.ProductID
WHERE p.Category = 'Clothing');

-- 6)Write a SQL query to retrieve the names of all employees who have sold at least one product to customers who have placed orders for products in the "Electronics" category, but have never placed an order for products in the "Clothing" category. The output should only include employees who have made at least one such sale.

SELECT DISTINCT E.Name AS EmployeeName
FROM Employees E
INNER JOIN Orders O ON E.EmployeeID = O.EmployeeID
INNER JOIN OrderDetails OD ON O.OrderID = OD.OrderID
INNER JOIN Products P ON OD.ProductID = P.ProductID
INNER JOIN Customers C ON O.CustomerID = C.CustomerID
WHERE P.Category = 'Electronics'
AND C.CustomerID NOT IN (
    SELECT C.CustomerID
    FROM Customers C
    INNER JOIN Orders O ON C.CustomerID = O.CustomerID
    INNER JOIN OrderDetails OD ON O.OrderID = OD.OrderID
    INNER JOIN Products P ON OD.ProductID = P.ProductID
    WHERE P.Category = 'Clothing'
);

-- 7)Write a SQL query to retrieve the names of all customers who have placed orders for more than five different products in the "Electronics" category.

SELECT  C.Name FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN Products P ON P.ProductID = O.ProductID
WHERE P.Category = 'Electronics'
GROUP BY C.NAME
HAVING COUNT(DISTINCT O.OrderID)>5;

-- 8)Write a SQL query to retrieve the names of all employees who have sold products to customers who have placed orders for more than five different products in the "Electronics" category. The output should only include employees who have made at least one such sale.

SELECT DISTINCT E.Name FROM Employees E
INNER JOIN Orders O ON E.EmployeeID = O.EmployeeID
WHERE O.CustomerID IN (SELECT  C.CustomerID FROM Customers C
INNER JOIN Orders O ON O.CustomerID = C.CustomerID
INNER JOIN Products P ON P.ProductID = O.ProductID
WHERE p.Category = 'Electronics'
GROUP BY C.CustomerID
HAVING COUNT(DISTINCT O.OrderID)>5)