DROP TABLE IF EXISTS videos;
CREATE TABLE videos(
   id     INTEGER  NOT NULL PRIMARY KEY 
  ,title  VARCHAR(50) NOT NULL
  ,url    VARCHAR(50) NOT NULL
  ,rating INTEGER  NOT NULL

);
INSERT INTO videos(id,title,url,rating) VALUES (523523,'Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',3500);
INSERT INTO videos(id,title,url,rating) VALUES (523427,'The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230);
INSERT INTO videos(id,title,url,rating) VALUES (82653,'Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk',2111);
INSERT INTO videos(id,title,url,rating) VALUES (858566,'Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=Dh-ULbQmmF8',11);
INSERT INTO videos(id,title,url,rating) VALUES (453538,'Chris Brown Soul Train Medley','https://www.youtube.com/watch?v=dnIiFIddJLo',3211);
INSERT INTO videos(id,title,url,rating) VALUES (283634,'Coding Adventure: Chess AI','https://www.youtube.com/watch?v=U4ogK0MIzqk',211);
INSERT INTO videos(id,title,url,rating) VALUES (562824,'The Let Out','https://www.youtube.com/watch?v=JWIqrKhP2Kg',111);
INSERT INTO videos(id,title,url,rating) VALUES (442452,'Tia Tamera','https://www.youtube.com/watch?v=C_yI2959DYU',671);
INSERT INTO videos(id,title,url,rating) VALUES (536363,'Imma Get It','https://www.youtube.com/watch?v=6b6K1Umz_ro',76);
