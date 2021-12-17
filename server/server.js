const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { Pool } = require("pg");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: "Azan",
  host: "localhost",
  database: "fullstack_videos",
  password: "azan",
  port: 5432,
});

// const videos = require("./exampleresponse.json");

// GET all videos from this route "/".
app.get(["/", "/:videoId"], (req, res) => {
  const videoId = Number(req.params.videoId);
  if (videoId) {
    pool
      .query("SELECT * FROM videos WHERE id = $1;", [videoId])
      .then((result) => {
        if (result.rows.length === 0) {
          res
            .status(404)
            .send(`Video with the given ID: ${videoId} doesn't exist!`);
        } else {
          res.json(result.rows);
        }
      })
      .catch((error) => console.error(error));
  } else {
    pool
      .query("SELECT * FROM videos;")
      .then((result) => res.json(result.rows))
      .catch((error) => console.error(error));
  }
});

// POST a new video from this route "/".
app.post("/", (req, res) => {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;
  const newVideoRating = 0;

  if (!newVideoTitle) {
    res.status(400).send("Please enter a valid video title.");
  } else if (!newVideoUrl) {
    res.status(400).send("Please enter a valid video url.");
  } else if (!newVideoUrl.includes("youtube")) {
    res.status(400).send("The url entered is incorrect.");
  }
  pool
    .query("SELECT * FROM videos WHERE url=$1;", [newVideoUrl])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400).send("Video already exists!");
      } else {
        const query =
          "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3);";
        pool
          .query(query, [newVideoTitle, newVideoUrl, newVideoRating])
          .then(() => res.status(200).send("New Video Added!"))
          .catch((error) => console.error(error));
      }
    });
});

// DELETE a video with an Id from this route "/1".
app.delete("/:videoId", async (req, res) => {
  const videoId = Number(req.params.videoId);
  const videoIdCheck = await pool.query("SELECT * FROM videos WHERE id = $1;", [
    videoId,
  ]);
  if (videoIdCheck.rows.length <= 0) {
    res.status(404).send(`Video with the given ID:${videoId} does not exist!`);
  } else {
    const query = "DELETE FROM videos WHERE id = $1;";
    pool
      .query(query, [videoId])
      .then(res.status(200).send("Video Deleted!"))
      .catch((error) => console.error(error));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
