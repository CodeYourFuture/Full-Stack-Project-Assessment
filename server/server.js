const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect();

// GET "/"
app.get("/", (req, res) => {
  const query = "SELECT * FROM videos ORDER BY rating DESC";
  pool
    .query(query)
    .then((videos) => res.json(videos.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST "/"
app.post("/", (req, res) => {
  const REGEXP =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const isValidYoutubeUrl = (link) => {
    return link.trim().match(REGEXP) !== null;
  };

  const addedVideoTitle = req.body.title.trim();
  const addedVideoUrl = req.body.url.trim();
  const todayDate = new Date().toISOString().slice(0, 10);
  const addedVideoRating = 0;

  if (!addedVideoTitle || !isValidYoutubeUrl(addedVideoUrl)) {
    res.sendStatus(400);
    return;
  }
  pool
    .query("SELECT * FROM videos WHERE url=$1", [addedVideoUrl])
    .then((result) => {
      if (result.rows.length > 0) {
        res.sendStatus(422); // url already exists
        return;
      }
      const query =
        "INSERT INTO videos (title, url, rating, date) VALUES ($1, $2, $3, $4)";
      pool
        .query(query, [
          addedVideoTitle,
          addedVideoUrl,
          addedVideoRating,
          todayDate,
        ])
        .then(() => res.sendStatus(201))
        .catch((error) => {
          console.error(error);
          res.status(500).json(error);
        });
    });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const requestedVideoId = Number(req.params.id);
  if (!requestedVideoId) {
    res.sendStatus(404);
    return;
  }
  const query = "SELECT * FROM videos WHERE id=$1";
  pool
    .query(query, [requestedVideoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const deletedVideoId = Number(req.params.id);
  if (!deletedVideoId) {
    res.sendStatus(404);
    return;
  }
  const query = "DELETE FROM videos WHERE id=$1";
  pool
    .query(query, [deletedVideoId])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// PUT "{id}"
app.put("/:id", (req, res) => {
  const requestedVideoId = Number(req.params.id);
  const changedVideoRating = Number(req.body.rating);
  console.log(requestedVideoId, changedVideoRating);
  if (!requestedVideoId || !changedVideoRating) {
    res.sendStatus(404);
    return;
  }
  const query = "UPDATE videos SET rating=$1 WHERE id=$2";
  pool
    .query(query, [changedVideoRating, requestedVideoId])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
