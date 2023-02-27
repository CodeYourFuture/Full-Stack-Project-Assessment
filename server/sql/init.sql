CREATE TABLE IF NOT EXISTS videos(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(255),
    rating INTEGER
);

INSERT INTO
    videos (title, url, rating)
VALUES
    ('test data 1', 'http://test.url.1', 0);

INSERT INTO
    videos (title, url, rating)
VALUES
    ('test data 2', 'http://test.url.3', 5);

INSERT INTO
    videos (title, url, rating)
VALUES
    ('test data 2', 'http://test.url.3', 3);