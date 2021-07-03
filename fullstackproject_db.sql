CREATE TABLE videos (
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(120) NOT NULL,
  url      VARCHAR(120),
  rating   INT NOT NULL
);

INSERT INTO videos (title, url, rating) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',23 );
INSERT INTO videos (title, url, rating) VALUES ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230 );
INSERT INTO videos (title, url, rating) VALUES ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk', 11 );
INSERT INTO videos (title, url, rating) VALUES ('Belkıs ÖOzener - Sevemedim Kara Gozlum','https://www.youtube.com/watch?v=ccYt6LEQtP8', 0 );

