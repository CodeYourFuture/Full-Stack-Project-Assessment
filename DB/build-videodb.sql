-- build the video database
--


CREATE TABLE videos (
  id SERIAL primary key,	-- always assigned a value
  title varchar not null,	-- standard room rate per night
  url varchar not null,	  -- room classification
  rating integer default 0		-- maximum people that can be accommodated

);

INSERT INTO videos VALUES(523523,'Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',23);

INSERT INTO videos VALUES(523427,'The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230);

INSERT INTO videos VALUES(82653,'Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk',2111);

INSERT INTO videos VALUES(858566,'Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=xbs7FT7dXYc',11);

INSERT INTO videos VALUES(283634,'Learn Unity - Beginner''s Game Development Course','https://www.youtube.com/watch?v=gB1F9G0JXOo',211);

INSERT INTO videos VALUES(787878,'Neo Soul Lofi','https://www.youtube.com/watch?v=WJktfqMP7yY',300);



