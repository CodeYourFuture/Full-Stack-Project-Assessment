-- build the video database
--

CREATE TABLE videos (
  id SERIAL primary key,	-- always assigned a value of id automatically with serial
  title varchar not null,		-- title of the video
  url varchar not null,			-- url of the video
  rating integer DEFAULT 0			-- video rating
);

INSERT INTO videos VALUES(523523,'Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ',23);
INSERT INTO videos VALUES(523427,'The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE',230);
INSERT INTO videos VALUES(82653,'Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk',2111);
INSERT INTO videos VALUES(523524,'Submarine Cables and the Rise of Mass Surveillance','https://www.youtube.com/watch?v=2P3P5OkGt8Q',243);
INSERT INTO videos VALUES(858566,'Therapist Reacts to SPIDER-MAN: INTO THE SPIDER-VERSE','https://www.youtube.com/watch?v=mOb0tugayyg',11);
INSERT INTO videos VALUES(453538,'LiSA - homura / THE FIRST TAKE','https://www.youtube.com/watch?v=4Q9DWZLaY2U',3211);
INSERT INTO videos VALUES(283634,'Keanu Reeves Reacts to John Wick 4 Fan Theories with Director Chad Stahelski | Vanity Fair','https://www.youtube.com/watch?v=U4qTZ_ENmw8&t=284s',211);
INSERT INTO videos VALUES(562824,'Cracking Enigma in 2021 - Computerphile','https://www.youtube.com/watch?v=RzWB5jL5RX0',111);
INSERT INTO videos VALUES(442452,'Coding Adventure: Chess AI','https://www.youtube.com/watch?v=U4ogK0MIzqk',671);
INSERT INTO videos VALUES(536363,'Coding Adventure: Ant and Slime Simulations','https://www.youtube.com/watch?v=X-iSQQgOd1A',76);
INSERT INTO videos VALUES(323445,'Why the Tour de France is so brutal','https://www.youtube.com/watch?v=ZacOS8NBK6U',73);
