CREATE TABLE movies (
  id                SERIAL PRIMARY KEY,
  title             VARCHAR(90) NOT NULL,
  url               VARCHAR(90),
  upload_date       DATE NOT NULL,
  upload_time       TIME NOT NULL,
  likes             NUMERIC NOT NULL,
  dislikes          NUMERIC NOT NULL
         
);

INSERT INTO movies (title, url, likes, dislikes, upload_date, upload_time) VALUES ('[5/10/2023] Judy Justice S02', 'https://www.youtube.com/watch?v=keZdZjpZWnY', 0, 0, '2017-03-19', '08:35:02');
INSERT INTO movies (title, url, likes, dislikes, upload_date, upload_time) VALUES ('Osocity Soca Maix - Best Of Old School', 'https://www.youtube.com/watch?v=zJytmRO8K7M', 0, 0, '2012-07-04', '17:25:16');
INSERT INTO movies (title, url, likes, dislikes, upload_date, upload_time) VALUES ('I Turned Dollar Store Food Gourmet', 'https://www.youtube.com/watch?v=uhYiRmGURwE', 0, 0, '2019-07-04', '21:58:45');
INSERT INTO movies (title, url, likes, dislikes, upload_date, upload_time) VALUES ('Easy Summer Box Braids! (Beginner Friendly)', 'https://www.youtube.com/watch?v=h7spCXYLndY', 0, 0, '2021-01-19', '12:38:15');
INSERT INTO movies (title, url, likes, dislikes, upload_date, upload_time) VALUES ('ABC Song + More Nursery Rhymes & Kids Songs - CoComelon', 'https://www.youtube.com/watch?v=71h8MZshGSs', 0, 0, '2023-04-23', '04:38:15');

