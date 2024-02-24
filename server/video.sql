
CREATE TABLE video(
    id SERIAL primary key,
    title VARCHAR(50) NOT NULL,
    video_url VARCHAR(200) NOT NULL,
    rating INT,
    created_at TIMESTAMP default CURRENT_TIMESTAMP 

);

CREATE TABLE video_vote(
    id SERIAL primary key,
    video_id INT REFERENCES video(id),
    up_vote INT default 0,
    down_vote INT default 0

);