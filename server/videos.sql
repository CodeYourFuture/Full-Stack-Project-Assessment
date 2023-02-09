CREATE TABLE videos (
  id            SERIAL PRIMARY KEY,
  title   VARCHAR(200) NOT NULL,
  url      VARCHAR(200) NOT NULL,
  rating  INT
);