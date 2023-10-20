require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

// credentials for database
const db = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: true,
});

// GET "/"

// Connecting to database
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// This endpoint is used to get all the videos using SQL queries

app.get("/videos", (req, res) => {
  db.query(`SELECT * FROM videos ORDER BY title`)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send("Database Error");
    });
});

// get one single video using the ID using SQL queries
app.get("/videos/:id", function (req, res) {
  const searchId = Number(req.params.id);

  db.query("SELECT * FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          result: "failure",
          message: "Video could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({
        result: "failure",
        message: "Database Error",
      });
    });
});

// This endpoint is used to add a new video
app.post("/videos", (req, res) => {
  const { title, url } = req.body;
  if (
    !title ||
    !url ||
    !url.startsWith(
      "https://www.youtube.com" ||
        urlObject.startsWith("https://youtu.be") ||
        urlObject.startsWith("https://m.youtube.com") ||
        urlObject.startsWith("https://youtube.com/")
    )
  ) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const query = `INSERT INTO videos (title, url, rating, createdAt)
                      VALUES ($1, $2, 0, now());`;

    db.query(query, [title, url])
      .then(() => {
        res.status(201).send("Added a new video");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Database error");
      });
  }
});

// This endpoint is used to get a single video with a given ID

app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.");
  } else {
    res.status(200).json({ matchingVideo });
  }
});

// This endpoint is used to delete a single video with a given ID
app.delete("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM videos WHERE id=$1", [id])
    .then(() => res.send(`Video ${id} deleted!`))
    .catch((err) => console.error(err));
});

// This endpoint is used to update the rating by adding 1 to an existing video rating with a given ID when UpVote icon/button is clicked

app.put("/videos/:id/upvote", (req, res) => {
  const id = Number(req.params.id);
  db.query(
    "UPDATE videos SET rating = rating + 1 WHERE id = $1 RETURNING rating",
    [id]
  )
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// This endpoint is used to update the rating by subtracting 1 from an existing video rating with a given ID when downVote icon/button is clicked

app.put("/videos/:id/downvote", (req, res) => {
  const id = Number(req.params.id);
  db.query(
    "UPDATE videos SET rating = rating - 1 WHERE id = $1 RETURNING rating",
    [id]
  )
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
