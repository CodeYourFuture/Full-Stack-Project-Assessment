CREATE TABLE videos (
    id serial PRIMARY KEY,
    title varchar(120),
    url varchar(200),
    rating int
);
INSERT INTO "videos" (id, title, url, rating)
VALUES (
        523523,
        'Never Gonna Give You Up',
        'dQw4w9WgXcQ',
        23
    ),
    (
        523427,
        'The Coding Train',
        'HerCR8bw_GE',
        230
    ),
    (
        323445,
        'Why the Tour de France is so brutal',
        'ZacOS8NBK6U',
        73
    ),
    (
        82653,
        'Mac & Cheese | Basics with Babish',
        'FUeyrEN14Rk',
        2111
    ),
    (
        858566,
        'Videos for Cats to Watch - 8 Hour Bird Bonanza',
        'xbs7FT7dXYc',
        11
    ),
    (
        453538,
        'The Complete London 2012 Opening Ceremony | London 2012 Olympic Games',
        '4As0e4de-rI',
        3211
    ),
    (
        562824,
        'Cracking Enigma in 2021 - Computerphile',
        'RzWB5jL5RX0',
        111
    );
​
ALTER SEQUENCE videos_id_seq restart 600001;
 
INSERT INTO videos (title, url, rating)
VALUES ('Coding Adventure: Chess AI', 'U4ogK0MIzqk', 671);
INSERT INTO videos (title, url, rating)
VALUES ('Coding Adventure: Ant and Slime Simulations', 'X-iSQQgOd1A', 76);