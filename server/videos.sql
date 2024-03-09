DROP TABLE IF EXISTS videos;
CREATE TABLE videos (
  id                SERIAL PRIMARY KEY,
  title        VARCHAR(200) NOT NULL,
  url          VARCHAR(200) NOT NULL,
  rating       INT NOT NULL
  
);


INSERT INTO videos (title, url, rating) VALUES ('The Coding Trainw', 'https://www.youtube.com/watch?v=HerCR8bw_GE', 230);
INSERT INTO videos (title, url, rating) VALUES ('Mac & Cheese | Basics with Babish', 'https://www.youtube.com/watch?v=FUeyrEN14Rk', 2110);
INSERT INTO videos (title, url, rating) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc', 11);
INSERT INTO videos (title, url, rating) VALUES ('100+ JavaScript Concepts you Need to Know', 'https://www.youtube.com/watch?v=lkIFF4maKMU', 3211);
INSERT INTO videos (title, url, rating) VALUES ('Learn Unity - Beginner`s Game Development Course', 'https://www.youtube.com/watch?v=gB1F9G0JXOo', 211);
INSERT INTO videos (title, url, rating) VALUES ('Cracking Enigma in 2021 - Computerphile', 'https://www.youtube.com/watch?v=RzWB5jL5RX0', 111);
INSERT INTO videos (title, url, rating) VALUES ('Coding Adventure: Chess AI', 'https://www.youtube.com/watch?v=U4ogK0MIzqk', 673);
INSERT INTO videos (title, url, rating) VALUES ('Coding Adventure: Ant and Slime Simulations', 'https://www.youtube.com/watch?v=X-iSQQgOd1A', 76);
INSERT INTO videos (title, url, rating) VALUES ('Why the Tour de France is so brutal', 'https://www.youtube.com/watch?v=ZacOS8NBK6U', 200);




