-- 1)Create a database structure for product and categories. One product can be in more than one category and one category can have multiple products.

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    ProductDescription TEXT,
    Price DECIMAL(10,2)
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(100)
);

CREATE TABLE Product_Category (
    ProductID INT,
    CategoryID INT,
    PRIMARY KEY (ProductID, CategoryID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);


-- 2)Create a database structure for students and its college. One student can be on one college only.

CREATE TABLE Colleges (
    CollegeID INT PRIMARY KEY,
    CollegeName VARCHAR(100)
);

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    CollegeID INT,
    FOREIGN KEY (CollegeID) REFERENCES Colleges(CollegeID)
);

-- 3)Create a database structure for worldwide cricket team. Database will contain, each player’s name, its country, it’s expertise and so on. 

CREATE TABLE Countries (
    CountryID INT PRIMARY KEY,
    CountryName VARCHAR(256)
);

CREATE TABLE Expertise (
    ExpertiseID INT PRIMARY KEY,
    ExpertiseName VARCHAR(256)
);

CREATE TABLE Players (
    PlayerID INT PRIMARY KEY,
    PlayerName VARCHAR(256),
    CountryID INT,
    FOREIGN KEY (CountryID) REFERENCES Countries(CountryID)
);

CREATE TABLE Player_Expertise (
    PlayerID INT,
    ExpertiseID INT,
    PRIMARY KEY (PlayerID, ExpertiseID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (ExpertiseID) REFERENCES   Expertise(ExpertiseID)
);

