
CREATE TABLE movies (
  movie_id       SERIAL PRIMARY KEY,
  movie_title    VARCHAR(200) NOT NULL,
  movie_url      TEXT NOT NULL,
  rating          INT NOT NULL
);