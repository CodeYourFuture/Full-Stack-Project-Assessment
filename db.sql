CREATE DATABASE videos_database;
--\l lists all your database 
--\c videos_database

CREATE TABLE videos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  url VARCHAR(50) NOT NULL,
  rating SERIAL
);