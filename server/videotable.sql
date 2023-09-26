CREATE TABLE videos 
    (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        url VARCHAR(120) NOT NULL,
        rating integer not null
);