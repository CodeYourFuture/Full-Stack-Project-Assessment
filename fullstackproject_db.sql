CREATE DATABASE fullstackproject_db;

CREATE TABLE videos (
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(120) NOT NULL,
  url      VARCHAR(120),
  rating   INT NOT NULL
);

INSERT INTO videos (title, url, rating) VALUES ('Git and GitHub for Beginners','https://www.youtube.com/watch?v=RGOj5yH7evk',28000);
INSERT INTO videos (title, url, rating) VALUES ('You need to learn Python RIGHT NOW!! // EP 1','https://www.youtube.com/watch?v=mRMmlo_Uqcs'.15000);
INSERT INTO videos (title, url, rating) VALUES ('Clutching Kills, I Got it AGAIN!','https://www.youtube.com/watch?v=lxC24Ks6aJU'111);
INSERT INTO videos (title, url, rating) VALUES ('Seether-Fine Again', 'https://www.youtube.com/watch?v=Li2PVKMZCo4');
INSERT INTO videos (title, url, rating) VALUES ('I bought a DDoS attack on the DARK WEB','https://www.youtube.com/watch?v=eZYtnzODpW4&t=2s'91000 );
