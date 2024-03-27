DROP TABLE IF EXISTS videos CASCADE;

CREATE TABLE videos(
    name VARCHAR,
    src VARCHAR
);

INSERT INTO videos (name,src) VALUES ('The Coding Train', 'https://www.youtube.com/watch?v=HerCR8bw_GE');