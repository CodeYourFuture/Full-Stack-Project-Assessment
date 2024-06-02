DROP TABLE IF EXISTS videos CASCADE;

CREATE TABLE videos (
    title VARCHAR,
    src VARCHAR
);

INSERT INTO videos (title,src) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
-- you can insert more rows using example data from the example_data.csv file