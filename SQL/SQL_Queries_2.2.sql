-- CASE 1

CREATE TABLE Activity (
    player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, event_date)
);

-- Question 1: Write an SQL query to report the first login date for each player. Return the result table in any order.

SELECT player_id, MIN(event_date) AS first_login_date
FROM Activity
GROUP BY player_id;

-- Question 2: Write an SQL query to report the device that is first logged in for each player. Return the result table in any order.

SELECT a.player_id, a.device_id AS first_logged_device
FROM (
    SELECT player_id, MIN(event_date) AS first_login_date
    FROM Activity
    GROUP BY player_id
) AS first_login
JOIN Activity AS a ON first_login.player_id = a.player_id AND first_login.first_login_date = a.event_date;


-- Question 3: Write an SQL query to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date. Check the example for clarity. Return the result table in any order.

SELECT 
    player_id, 
    event_date, 
    SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM 
    Activity;


-- CASE 2

CREATE TABLE Courses (
    student VARCHAR(255),
    class VARCHAR(255),
    PRIMARY KEY (student, class)
);

-- Question 1: Write an SQL query to report all the classes that have at least five students. Return the result table in any order.

SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;