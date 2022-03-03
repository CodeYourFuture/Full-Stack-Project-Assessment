-- this will simply add some data to the heroku database.

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    url VARCHAR(2048) NOT NULL,
    rating INT
)

INSERT INTO videos (title, url, rating) VALUES('Never Gonna Give You Up', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 23);
INSERT INTO videos (title, url, rating) VALUES('The Coding Train', 'https://www.youtube.com/watch?v=HerCR8bw_GE', 230);
INSERT INTO videos (title, url, rating) VALUES('Mac & Cheese | Basics with Babish', 'https://www.youtube.com/watch?v=FUeyrEN14Rk', 2111);
INSERT INTO videos (title, url, rating) VALUES('Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc', 11);
INSERT INTO videos (title, url, rating) VALUES('The Complete London 2012 Opening Ceremony | London 2012 Olympic Games', 'https://www.youtube.com/watch?v=4As0e4de-rI', 3211);
INSERT INTO videos (title, url, rating) VALUES('Learn Unity - Beginners Game Development Course', 'https://www.youtube.com/watch?v=gB1F9G0JXOo', 211);
INSERT INTO videos (title, url, rating) VALUES('Cracking Enigma in 2021 - Computerphile', 'https://www.youtube.com/watch?v=RzWB5jL5RX0', 111);
INSERT INTO videos (title, url, rating) VALUES('Coding Adventure: Chess AI', 'https://www.youtube.com/watch?v=U4ogK0MIzqk', 671);
INSERT INTO videos (title, url, rating) VALUES('Coding Adventure: Ant and Slime Simulations', 'https://www.youtube.com/watch?v=X-iSQQgOd1A', 76);
INSERT INTO videos (title, url, rating) VALUES('Why the Tour de France is so brutal', 'https://www.youtube.com/watch?v=ZacOS8NBK6U', 73);