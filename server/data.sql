CREATE DATABASE videosapp;

CREATE TABLE
    videos (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255),
        url VARCHAR(255),
        rating INT
    );

\set content `cat 'exampleresponse.json'`

 INSERT INTO videos SELECT * FROM json_populate_recordset(null::videos, :'content');