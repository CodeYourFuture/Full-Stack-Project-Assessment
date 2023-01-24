CREATE TABLE video (
  id       SERIAL PRIMARY KEY,
  title     VARCHAR(100) NOT NULL,
  url  		VARCHAR(200) NOT NULL,
  rating    INT NOT null
  );
 
  
INSERT INTO video (title, url, rating) VALUES ('The Coding Train', 'https://www.youtube.com/watch?v=HerCR8bw_GE', 230);
INSERT INTO video (title, url, rating) VALUES ('Mac & Cheese | Basics with Babish', 'https://www.youtube.com/watch?v=FUeyrEN14Rk', 2111);
INSERT INTO video (title, url, rating) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc', 110);
INSERT INTO video (title, url, rating) VALUES ('Learn Unity - Beginners Game Development Course', 'https://www.youtube.com/watch?v=gB1F9G0JXOo', 211);
INSERT INTO video (title, url, rating) VALUES ('Cracking Enigma in 2021 - Computerphile', 'https://www.youtube.com/watch?v=RzWB5jL5RX0', 111);
INSERT INTO video (title, url, rating) VALUES ('Coding Adventure: Chess AI', 'https://www.youtube.com/watch?v=U4ogK0MIzqk', 671);
INSERT INTO video (title, url, rating) VALUES ('Coding Adventure: Ant and Slime Simulations', 'https://www.youtube.com/watch?v=X-iSQQgOd1A', 76);
INSERT INTO video (title, url, rating) VALUES ('Why the Tour de France is so brutal', 'https://www.youtube.com/watch?v=ZacOS8NBK6U', 370);
INSERT INTO video (title, url, rating) VALUES ('NewJeans (뉴진스) OMG', 'https://www.youtube.com/embed/_ZAgIHmHLdc', 4611);
INSERT INTO video (title, url, rating) VALUES ('BTS (Run BTS)', 'https://www.youtube.com/embed/aqW4xXUgmno', 80000);

SELECT * FROM video;
