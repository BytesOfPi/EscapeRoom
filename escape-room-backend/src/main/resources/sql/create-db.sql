CREATE TABLE teams (
  id		INTEGER PRIMARY KEY,
  name 		VARCHAR(30),
  cred		VARCHAR(50)
);
CREATE TABLE players (
  id		INTEGER PRIMARY KEY,
  teamId 	INTEGER, 	
  name 		VARCHAR(30)
);
CREATE TABLE attempts (
  id         INTEGER PRIMARY KEY,
  name 	VARCHAR(30),
  email  VARCHAR(50)
);


INSERT INTO players VALUES (1, 1, 'Bob');
INSERT INTO players VALUES (2, 1, 'Sally');
INSERT INTO players VALUES (3, 2, 'Bill');
INSERT INTO players VALUES (4, 2, 'Joanne');