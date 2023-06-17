CREATE DATABASE cyf_videos;

 CREATE TABLE videos(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(255),
    rating integer
);

