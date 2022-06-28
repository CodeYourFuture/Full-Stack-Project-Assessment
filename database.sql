CREATE TABLE videos (
  id        SERIAL PRIMARY KEY,
  title     VARCHAR(120) NOT NULL,
  url     VARCHAR(500) NOT NULL,
  rating int NOT NULL
);
insert into videos
    (title,url,rating)
    values ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',333);  

  insert into videos
    (title, url, rating)
    values
        ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk',10),
        ('Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc',433);   