const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'alexjora',
  password: 'oRhzxyM389lljTDZxwXPoJ7gpPyUNcqf',
  host: 'dpg-cf2i4h1gp3jl0q1tjd0g-a.oregon-postgres.render.com',
  port: 5432,
  database: 'videos_xkio',
  ssl: {
    rejectUnauthorized: false
  }
});

//get all videos

app.get('/videos', (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((allVideos) => res.json(allVideos.rows))
    .catch((err) => {
      console.err(err.message);
      res.status(500).json(err);
    });
});

//get one video by id

app.get('/videos/:videoId', (req, res) => {
  const { videoId } = req.params;
  pool
    .query("SELECT * FROM videos WHERE id = $1", [videoId])
    .then((video) => res.json(video.rows))
    .catch((err) => {
      console.err(err.message);
      res.status(500).json(err);
    });
});

//post a video

app.post("/videos", (req, res) => {
  const newId = req.body.video_id;
  const newTitle = req.body.video_title;
  const newUrl = req.body.video_url;
  const newRating = req.body.video_rating;

  if (!Number.isInteger(newRating) || newRating < 0) {
    return res
      .status(400)
      .send("Rating should be a positive integer.");
  }

  pool
    .query("SELECT * FROM videos WHERE video_title=$1", [newTitle])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("An video with the same title already exists!");
      } else {
        const query =
          "INSERT INTO videos (video_id, video_title, video_url, video_rating) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [newId, newTitle, newUrl, newRating])
          .then(() => res.send("Video created!"))
          .catch((error) => {
            console.error(error);
            res.status(500).json(error);
          });
      }
    });
});

//delete a video by id

app.delete('/videos/:videoId', (req, res) => {
  const { videoId } = req.params;
  pool
    .query("DELETE FROM videos WHERE id = $1", [videoId])
    .then(() => res.send(`Video with id ${videoId} deleted!`))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
