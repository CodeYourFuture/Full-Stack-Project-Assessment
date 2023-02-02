drop table if exists videos;

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    date TIMESTAMP NOT NULL
);

INSERT INTO videos (title,url, rating, date) VALUES ('The Complete London 2012 Opening Ceremony | London 2012 Olympic Games','https://www.youtube.com/watch?v=4As0e4de-rI','3211',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk','2111',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Coding Adventure: Chess AI','https://www.youtube.com/watch?v=U4ogK0MIzqk','671',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE','230',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Learn Unity - Beginners Game Development Course','https://www.youtube.com/watch?v=gB1F9G0JXOo','211',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Cracking Enigma in 2021 - Computerphile','https://www.youtube.com/watch?v=RzWB5jL5RX0','111',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Coding Adventure: Ant and Slime Simulations','https://www.youtube.com/watch?v=X-iSQQgOd1A','76',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Why the Tour de France is so brutal','https://www.youtube.com/watch?v=ZacOS8NBK6U','73',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ','23',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=xbs7FT7dXYc','11',NOW());
INSERT INTO videos (title,url, rating, date) VALUES ('Change Your Future with CodeYourFuture','https://www.youtube.com/watch?v=jz87O1kap7s','3211',NOW());