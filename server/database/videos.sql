CREATE TABLE videos(
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  url VARCHAR(43)  NOT NULL,
  videoid VARCHAR(11) NOT NULL,
  title VARCHAR(100)  NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  favourite BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-01','https://www.youtube.com/watch?v=dQw4w9WgXcQ','dQw4w9WgXcQ','Never Gonna Give You Up',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-02','https://www.youtube.com/watch?v=HerCR8bw_GE','HerCR8bw_GE','The Coding Train',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-03','https://www.youtube.com/watch?v=FUeyrEN14Rk','FUeyrEN14Rk','Mac & Cheese | Basics with Babish',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-04','https://www.youtube.com/watch?v=xbs7FT7dXYc','xbs7FT7dXYc','Videos for Cats to Watch - 8 Hour Bird Bonanza',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-05','https://www.youtube.com/watch?v=4As0e4de-rI','4As0e4de-rI','The Complete London 2012 Opening Ceremony | London 2012 Olympic Games',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-06','https://www.youtube.com/watch?v=gB1F9G0JXOo','gB1F9G0JXOo','Learn Unity - Beginner''s Game Development Course',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-07','https://www.youtube.com/watch?v=RzWB5jL5RX0','RzWB5jL5RX0','Cracking Enigma in 2021 - Computerphile',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-08','https://www.youtube.com/watch?v=U4ogK0MIzqk','U4ogK0MIzqk','Coding Adventure: Chess AI',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-09','https://www.youtube.com/watch?v=X-iSQQgOd1A','X-iSQQgOd1A','Coding Adventure: Ant and Slime Simulations',0,FALSE);
INSERT INTO videos(created_at,url,videoid,title,rating,favourite) VALUES ('2023-05-10','https://www.youtube.com/watch?v=ZacOS8NBK6U','ZacOS8NBK6U','Why the Tour de France is so brutal',0,FALSE);
