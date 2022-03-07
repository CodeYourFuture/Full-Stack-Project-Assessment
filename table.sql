DROP TABLE IF EXISTS youtube_videos CASCADE;


CREATE TABLE youtube_videos (
  id                        SERIAL PRIMARY KEY,
  title                     VARCHAR(300) NOT NULL,
  url                       VARCHAR(300) NOT NULL,
  rating                    INT(4) NOT NULL,
  uploaded                  VARCHAR(400),
);