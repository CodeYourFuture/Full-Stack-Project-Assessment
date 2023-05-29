CREATE TABLE videos (
  id                SERIAL PRIMARY KEY,
  title             VARCHAR(90) NOT NULL,
  url               VARCHAR(90),
  rating            Numeric 
  );
INSERT INTO videos (id, title, url, rating ) VALUES ('523523', "Never Gonna Give You Up", "https://www.youtube.com/watch?v=dQw4w9WgXcQ",0);
INSERT INTO videos (id, title, url, rating ) VALUES ('523427', "The Coding Train", "https://www.youtube.com/watch?v=HerCR8bw_GE",0);
INSERT INTO videos (id, title, url, rating ) VALUES ('82653', "Mac & Cheese | Basics with Babish","https://www.youtube.com/watch?v=FUeyrEN14Rk",0 );
INSERT INTO videos (id ,title, url, rating ) VALUES ('858566', "Learn Unity - Beginner's Game Development Course","https://www.youtube.com/watch?v=gB1F9G0JXOo",0);
INSERT INTO videos (id ,title, url, rating ) VALUES ('562824', "Cracking Enigma in 2021 - Computerphile", "https://www.youtube.com/watch?v=RzWB5jL5RX0",0);