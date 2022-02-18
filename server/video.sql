-->> The following line can be run on terminal to acces your data base on Heroku and edit them:
psql --host=ec2-34-255-21-191.eu-west-1.compute.amazonaws.com --port=5432 --username=cvzfmgkjyqnhgb --password --dbname=df9q5i3jod9a7a

-- useful resources : https://www.youtube.com/watch?v=80oty2v4HsE

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(200) NOT NULL,
    rating INT
);

INSERT INTO videos (title, url, rating) VALUES ('The Coding Train', 'https://www.youtube.com/watch?v=HerCR8bw_GE', 230), ('Mac & Cheese | Basics with Babish', 'https://www.youtube.com/watch?v=FUeyrEN14Rk', 2111), ('Videos for Cats to Watch - 8 Hour Bird Bonanza', 'https://www.youtube.com/watch?v=xbs7FT7dXYc', 11), ('The Complete London 2012 Opening Ceremony', 'https://www.youtube.com/watch?v=4As0e4de-rI', 3211), ('Doja in space', 'https://www.youtube.com/watch?v=0EVVKs6DQLo', 83 ), ('Naomi on 4', 'https://www.youtube.com/watch?v=JpFZmisvrQQ', 100), ('Koala not stupid', 'https://www.youtube.com/watch?v=9DVGqXaaCMY' 192), ('Better days - Mae Muller', 'https://www.youtube.com/watch?v=GQAOrCOknCY', 45);
