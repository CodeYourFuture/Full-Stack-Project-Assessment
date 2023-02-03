CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(500) NOT NULL,
  rating INT,
  date DATE
);

INSERT INTO videos (title, url, rating, date)
VALUES ('Lenny Kravitz “Fly Away iTunes Festival London',
'https://www.youtube.com/watch?v=WCKn8xGwJVw',
23,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('The Coding Train',
'https://www.youtube.com/watch?v=HerCR8bw_GE',
230,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Mac & Cheese | Basics with Babish',
'https://www.youtube.com/watch?v=FUeyrEN14Rk',
1009,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza',
'https://www.youtube.com/watch?v=xbs7FT7dXYc',
11,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Live Performance at the London 2012 Olympic Games',
'https://www.youtube.com/watch?v=CwzjlmBLfrQ',
1211,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Learn Unity - Beginners Game Development Course',
'hhttps://www.youtube.com/watch?v=gB1F9G0JXOo',
211,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Cracking Enigma in 2021 - Computerphile',
'https://www.youtube.com/watch?v=RzWB5jL5RX0',
111,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Coding Adventure: Chess AI',
'https://www.youtube.com/watch?v=U4ogK0MIzqk',
671,
'2023-01-28');

INSERT INTO videos (title, url, rating, date)
VALUES ('Why the Tour de France is so brutal',
'https://www.youtube.com/watch?v=ZacOS8NBK6U',
73,
'2023-01-28');

ALTER TABLE videos 
RENAME COLUMN name TO title;

SELECT * FROM videos ORDER BY rating DESC;