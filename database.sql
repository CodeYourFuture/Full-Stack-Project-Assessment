--psql -U posgres
--CREATE DATABASE videos;
--\c videos;

CREATE TABLE video (id       SERIAL PRIMARY KEY, title    VARCHAR(30) NOT NULL, created  TIMESTAMP NOT NULL,rating   INT NOT NULL,url  VARCHAR(120) NOT NULL);

INSERT INTO video (title, created, rating, url) VALUES ('Never Gonna Give You Up', '2020-01-01 04:05:06', 23,'https://www.youtube.com/watch?v=dQw4w9WgXcQ');