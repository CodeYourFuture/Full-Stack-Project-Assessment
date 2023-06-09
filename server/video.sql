DROP TABLE IF EXISTS  cyf_videos;

CREATE TABLE cyf_videos (id SERIAL PRIMARY KEY,
                                        title VARCHAR(110) NOT NULL,
                                           url_link VARCHAR(90) NOT NULL,
                                                rating INTEGER NOT NULL );

INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    523523,
     "Never Gonna Give You Up",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    23
);


INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    523427,
    "The Coding Train",
    "https://www.youtube.com/watch?v=HerCR8bw_GE",
    230
);

INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    858566,
    "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    11
);
INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    453538,
   "London 2012 - Olympics - Opening Ceremony Highlight's",
    "https://www.youtube.com/watch?v=smMJi1SrFSE",
    3211
);

INSERT INTO cyf_videos(id, title, url_link, rating)
VALUES (
    283634,
    "Learn Unity - Beginner's Game Development Course",
    "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    211
);

INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    562824,
    "Cracking Enigma in 2021 - Computerphile",
    "https://www.youtube.com/watch?v=RzWB5jL5RX0"
    111
);
INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    442452,
    "Coding Adventure: Chess AI",
    "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    671
);

INSERT INTO cyf_videos (id, title, url_link, rating)
VALUES (
    536363,
    "Coding Adventure: Ant and Slime Simulations",
    "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    76
);

INSERT INTO cyf_videos (id, title, url_link, rating)
    VALUES (
    323445,
    "Why the Tour de France is so brutal",
    "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    73
);

INSERT INTO cyf_videos (id, title, url_link, rating)
    VALUES (
    323446,
   "Travel the Universe While Relaxation ★ Space Ambient Music",
    "https://www.youtube.com/watch?v=ztVV54sPOns&t=9s",
   19019
);

INSERT INTO cyf_videos (id, title, url_link, rating)
    VALUES (
    323447,
   "Focus Episode 1 + Addition Ad Desktop Arrow CTA",
    "https://www.youtube.com/watch?v=fOdo1GkzZAk",
   11011
);

INSERT INTO cyf_videos (id, title, url_link, rating)
    VALUES (
    323448,
   "Change Your Future with CodeYourFuture",
   "https://www.youtube.com/watch?v=jz87O1kap7s",
  711111
);