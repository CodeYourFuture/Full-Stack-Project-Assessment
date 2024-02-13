CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL
);

INSERT INTO videos (id, title, url, rating) VALUES
  (523523, 'Never Gonna Give You Up', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 23),
  (523427, 'The Coding Train', 'https://www.youtube.com/watch?v=HerCR8bw_GE', 230),
  (82653, 'Mac & Cheese | Basics with Babish', 'https://www.youtube.com/watch?v=FUeyrEN14Rk', 2111),
  (858566, 'Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc', 11),
  (453538, 'The Complete London 2012 Opening Ceremony | London 2012 Olympic Games', 'https://www.youtube.com/watch?v=4As0e4de-rI', 3211),
  (283634, 'Learn Unity - Beginner\'s Game Development Course', 'https://www.youtube.com/watch?v=gB1F9G0JXOo', 211),
  (562824, 'Cracking Enigma in 2021 - Computerphile', 'https://www.youtube.com/watch?v=RzWB5jL5RX0', 111),
  (442452, 'Coding Adventure: Chess AI', 'https://www.youtube.com/watch?v=U4ogK0MIzqk', 671),
  (536363, 'Coding Adventure: Ant and Slime Simulations', 'https://www.youtube.com/watch?v=X-iSQQgOd1A', 76),
  (323445, 'Why the Tour de France is so brutal', 'https://www.youtube.com/watch?v=ZacOS8NBK6U', 73);
