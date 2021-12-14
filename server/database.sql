
CREATE DATABASE pernvideo;

CREATE TABLE videos(
  video_id SERIAL PRIMARY KEY, 
  title VARCHAR(255),
  url VARCHAR(255),
  vating INT
);