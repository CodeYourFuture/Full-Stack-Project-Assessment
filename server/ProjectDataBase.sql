DROP TABLE IF EXISTS videos;
CREATE TABLE videos(
  id     SERIAL PRIMARY KEY, 
  title  VARCHAR(500) NOT NULL,
  url    VARCHAR(500) NOT NULL,
  rating INTEGER  NOT NULL
);
INSERT INTO videos(title,url,rating) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',23);
INSERT INTO videos(title,url,rating) VALUES ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230);
INSERT INTO videos(title,url,rating) VALUES ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk',2111);
INSERT INTO videos(title,url,rating) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=xbs7FT7dXYc',11);
INSERT INTO videos(title,url,rating) VALUES ('Learn Unity - Beginner''s Game Development Course','https://www.youtube.com/watch?v=gB1F9G0JXOo',211);
INSERT INTO videos(title,url,rating) VALUES ('Cracking Enigma in 2021 - Computerphile','https://www.youtube.com/watch?v=RzWB5jL5RX0',111);
INSERT INTO videos(title,url,rating) VALUES ('Coding Adventure: Chess AI','https://www.youtube.com/watch?v=U4ogK0MIzqk',671);
INSERT INTO videos(title,url,rating) VALUES ('Coding Adventure: Ant and Slime Simulations','https://www.youtube.com/watch?v=X-iSQQgOd1A',76);
INSERT INTO videos(title,url,rating) VALUES ('Coding Interview 101','https://www.youtube.com/watch?v=K5qbSQm1Dr4&t=1347s',20345);
INSERT INTO videos(title,url,rating) VALUES ('Brandy Song','https://www.youtube.com/watch?v=gCVo2sLIndU',9730);
INSERT INTO videos(title,url,rating) VALUES ('SQL Tutorial - Full Database Course for Beginners','https://www.youtube.com/watch?v=HXV3zeQKqGY&t=4724s',77779);
INSERT INTO videos(title,url,rating) VALUES ('Codility - Binary Gap (JavaScript)','https://www.youtube.com/watch?v=PWADsooDNMg&list=PLqDHFR_FjG5-rH6Bg5xYMR-HTmSOqyF-L',9800);
INSERT INTO videos(title,url,rating) VALUES ('Learn Basic SQL in 15 Minutes','https://www.youtube.com/watch?v=kbKty5ZVKMY',10450);
INSERT INTO videos(title,url,rating) VALUES ('Studying Skills for the Tech Interview','https://www.youtube.com/watch?v=X-jUp2O_3M8',10420);
INSERT INTO videos(title,url,rating) VALUES ('How to Ace Your First Entry-Level Technical Interview','https://www.youtube.com/watch?v=D');

