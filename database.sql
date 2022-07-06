-- this database codes are just edited for to copy paste in Heroku's database terminal. this sql file is not liked to anything 
CREATE TABLE videos (
  id        SERIAL PRIMARY KEY,
  title     VARCHAR(120) NOT NULL,
  url     VARCHAR(500) NOT NULL,
  rating int NOT NULL
);
insert into videos
    (title,url,rating)
    values ('Post Malone, Swae Lee - Sunflower','https://www.youtube.com/watch?v=ApXoWvfEYVU',633);  

  insert into videos
    (title, url, rating)
    values
        ('Uplifting Acoustic Background Music','https://www.youtube.com/watch?v=Ou5yoKTFjEo&list=PLSGQIRpzlifkAcn891xvnto1g88UonE1L&index=3',472),
        ('"A glass of water" An inspirational story', 'https://www.youtube.com/watch?v=Rxjp-fkuc-U&list=PLSGQIRpzlifkAcn891xvnto1g88UonE1L',2135);   

        update videos
    set title='Maradona Goal of the Century',url = 'https://www.youtube.com/watch?v=1wVho3I0NtU'
    where id= 5;  

     update videos
    set rating=20
    where id= 7; 