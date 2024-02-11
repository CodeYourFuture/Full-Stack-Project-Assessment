CREATE TABLE videos (
  id CHAR(11) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  url CHAR(50) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  favourite BOOLEAN NOT NULL DEFAULT false,
  uploaded_date TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO
  videos (id, title, url)
VALUES
  (
    'NUYvbT6vTPs',
    'Cat Vibing To Ievan Polkka',
    'https://www.youtube-nocookie.com/embed/NUYvbT6vTPs'
  );