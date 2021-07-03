drop table if exists videos;


CREATE TABLE videos (
  id        SERIAL PRIMARY KEY,
  title     VARCHAR(220) NOT NULL,
  url       VARCHAR(220) NOT NULL,
  rating    integer not null
);

INSERT INTO videos (title, url, rating) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ', 23);
INSERT INTO videos (title, url, rating) VALUES ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE', 230);
INSERT INTO videos (title, url, rating) VALUES ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk', 2111);
INSERT INTO videos (title, url, rating) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=xbs7FT7dXYc', 11);
