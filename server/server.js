const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { Pool } = require("pg");
const { query } = require("express");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// let videosData = require("../client/src/exampleresponse.json");
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.PG_CONNECT,
});

// GET all videos
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// ADD a video
app.post("/", (req, res) => {
  let videoTitle = req.body.title;
  let videoURL = req.body.url;
  let videoRating = Math.floor(Math.random() * 10000);
  let videoId = Math.floor(Math.random() * 10000);

  const isUrlValid = videoURL.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );

  if (!videoTitle || !videoURL || !isUrlValid) {
    return res
      .status(400)
      .send({ msg: "Pease add a Title & URL from youtube !" });
  }

  pool
    .query("SELECT * FROM videos WHERE title = $1", [videoTitle])
    .then((result) => {
      if (result.rows.length) {
        return res
          .status(400)
          .send({ msg: `A video with title:${videoTitle} already exists` })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      } else {
        return pool
          .query(
            `INSERT INTO videos (title, url, rating, id) VALUES($1, $2, $3, $4)`,
            [videoTitle, videoURL, videoRating, videoId]
          )
          .then(() =>
            res.send({ msg: `Video ${videoTitle} added successfully` })
          )
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

// SEARCH video with text
// TESTED with `http://127.0.0.1:5000/search?term=never`
app.get("/search", (req, res) => {
  const searchTerm = req.query.term;
  let query = `SELECT * FROM videos WHERE LOWER(title) LIKE LOWER('%${searchTerm}%') ORDER BY title`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return res
          .status(400)
          .json({ msg: `No Videos found related to term ${searchTerm}` });
      }
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// GET a Video with ID
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  pool.query("SELECT * FROM videos WHERE id = $1", [videoId]).then((result) => {
    if (result.rows.length === 0) {
      return res.status(400).send({ msg: `Video:${videoId} does not exist` });
    }
    res.json(result.rows);
  });
});

// DELETE a Video with ID
app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  pool.query("SELECT * FROM videos WHERE id = $1", [videoId]).then((result) => {
    if (result.rows.length === 0) {
      return res
        .status(400)
        .send({ msg: `Video:${videoId} does not exist` })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } else {
      return pool
        .query("DELETE FROM videos WHERE id = $1", [videoId])
        .then(() => res.send({ msg: `Video:${videoId} Deleted!` }))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
