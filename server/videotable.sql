CREATE TABLE videos 
    (
        id SERIAL PRIMARY KEY,
        title VARCHAR(300) NOT NULL,
        url VARCHAR(120) NOT NULL,
        rating integer not null
);