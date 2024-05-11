\c videorec;

DROP TABLE IF EXISTS videos CASCADE;

CREATE TABLE videos (
    title VARCHAR,
    src VARCHAR
);

INSERT INTO videos (title,src) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
-- you can insert more rows using example data from the example_data.csv file
INSERT INTO videos (title,src) VALUES ("The Coding Train","https://www.youtube.com/watch?v=HerCR8bw_GE");
INSERT INTO videos (title,src) VALUES ("Mac & Cheese | Basics with Babish","https://www.youtube.com/watch?v=FUeyrEN14Rk");
INSERT INTO videos (title,src) VALUES ("Videos for Cats to Watch - 8 Hour Bird Bonanza","https://www.youtube.com/watch?v=xbs7FT7dXYc");
INSERT INTO videos (title,src) VALUES ("The Complete London 2012 Opening Ceremony | London 2012 Olympic Games","https://www.youtube.com/watch?v=4As0e4de-rI");
INSERT INTO videos (title,src) VALUES ("Learn Unity - Beginner's Game Development Course","https://www.youtube.com/watch?v=gB1F9G0JXOo");
INSERT INTO videos (title,src) VALUES ("Cracking Enigma in 2021 - Computerphile","https://www.youtube.com/watch?v=RzWB5jL5RX0");
INSERT INTO videos (title,src) VALUES ("Coding Adventure: Chess AI","https://www.youtube.com/watch?v=U4ogK0MIzqk");
INSERT INTO videos (title,src) VALUES ("Coding Adventure: Ant and Slime Simulations","https://www.youtube.com/watch?v=X-iSQQgOd1A");
INSERT INTO videos (title,src) VALUES ("Why the Tour de France is so brutal","https://www.youtube.com/watch?v=ZacOS8NBK6U");