DROP TABLE IF EXISTS videos;
CREATE TABLE videos(
  id     SERIAL PRIMARY KEY, 
  genre   VARCHAR(10) NOT NULL,
  title  VARCHAR(500) NOT NULL,
  url    VARCHAR(500) NOT NULL,
  rating INTEGER  NOT NULL
);
-- INSERT INTO videos(title,url,rating) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',23);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Cracking Enigma in 2021 - Computerphile','https://www.youtube.com/watch?v=RzWB5jL5RX0',111);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Coding Adventure: Ant and Slime Simulations','https://www.youtube.com/watch?v=X-iSQQgOd1A',76);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Coding Interview 101','https://www.youtube.com/watch?v=K5qbSQm1Dr4&t=1347s',20345);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','SQL Tutorial - Full Database Course for Beginners','https://www.youtube.com/watch?v=HXV3zeQKqGY&t=4724s',77779);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Codility - Binary Gap (JavaScript)','https://www.youtube.com/watch?v=PWADsooDNMg&list=PLqDHFR_FjG5-rH6Bg5xYMR-HTmSOqyF-L',9800);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Learn Basic SQL in 15 Minutes','https://www.youtube.com/watch?v=kbKty5ZVKMY',10450);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','Studying Skills for the Tech Interview','https://www.youtube.com/watch?v=X-jUp2O_3M8',10420);
INSERT INTO videos(genre,title,url,rating) VALUES ('coding','How to Ace Your First Entry-Level Technical Interview','https://www.youtube.com/watch?v=D');
INSERT INTO videos(genre,title,url,rating) VALUES ('beauty','How to apply full face makeup', 'https://www.youtube.com/watch?v=zS3d3A_lcUc', 57000);
INSERT INTO videos(genre,title,url,rating) VALUES ('fashion','Dress in plus-size fabulosity','https://www.youtube.com/watch?v=Tu4dk5xgj0Q', 3700);
INSERT INTO videos(genre,title,url,rating) VALUES ('fashion','Look Super-glam on a budget','https://www.youtube.com/watch?v=UcD8nTMzO0k', 4700);
INSERT INTO videos(genre,title,url,rating) VALUES ('beauty','Naomi Campbell-Beauty Routine','https://www.youtube.com/watch?v=oCJFJMsZRRo', 26000);
INSERT INTO videos(genre,title,url,rating) VALUES ('fashion','Top-5 Wardrobe Staples','https://www.youtube.com/watch?v=a7v0HpIeMDU', 10000);
INSERT INTO videos(genre,title,url,rating) VALUES ('beauty', 'How to Perfect Brows', 'https://www.youtube.com/watch?v=kesCKoaCNkE')
