----------------- Create a Table -----------------

CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  url VARCHAR(50) NOT NULL,
  rating  INTEGER,
  time TIMESTAMP NOT NULL);

 ----------------- Insert Rows to the Table -----------------

INSERT INTO videos (title,url,rating,time) VALUES ('Never Gonna Give You Up',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  23,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('The Coding Train',
  'https://www.youtube.com/watch?v=HerCR8bw_GE',
  230,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Mac & Cheese | Basics with Babish',
  'https://www.youtube.com/watch?v=FUeyrEN14Rk',
  2111,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Never Gonna Give You Up',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  23,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza',
  'https://www.youtube.com/watch?v=xbs7FT7dXYc',
  11,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Learn Unity - Beginner`s Game Development Course',
  'https://www.youtube.com/watch?v=gB1F9G0JXOo',
  211,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Learn Unity - Beginner`s Game Development Course',
  'https://www.youtube.com/watch?v=gB1F9G0JXOo',
  211,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Cracking Enigma in 2021 - Computerphile',
  'https://www.youtube.com/watch?v=RzWB5jL5RX0',
  111,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Coding Adventure: Chess AI',
  'https://www.youtube.com/watch?v=U4ogK0MIzq',
  671,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Coding Adventure: Ant and Slime Simulations',
  'https://www.youtube.com/watch?v=X-iSQQgOd1A',
  76,
  '2023-06-03 09:26:18.481'
);

INSERT INTO videos (title,url,rating,time) VALUES ('Why the Tour de France is so brutal',
  'https://www.youtube.com/watch?v=ZacOS8NBK6U',
  73,
  '2023-06-03 09:26:18.481'
);