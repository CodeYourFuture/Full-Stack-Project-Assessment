CREATE DATABASE videos_recommendation;

CREATE TABLE videos (
    id VARCHAR(255) PRIMARY KEY,
    Date VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    ratingup INT,
    ratingdown INT
);