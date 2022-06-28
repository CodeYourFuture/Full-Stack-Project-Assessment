CREATE TABLE videos (
id        SERIAL PRIMARY KEY,
title     VARCHAR(130) NOT NULL,       
url       VARCHAR(120) NOT NULL,
rating    INT NOT NULL
);

INSERT INTO videos (id, title, url, rating) VALUES (562824, 'Cracking Enigma in 2021 - Computerphile', 'https://www.youtube.com/watch?v=RzWB5jL5RX0', 111);
INSERT INTO videos (id, title, url, rating) VALUES (536363, 'Coding Adventure: Ant and Slime Simulations', 'https://www.youtube.com/watch?v=X-iSQQgOd1A', 76);
