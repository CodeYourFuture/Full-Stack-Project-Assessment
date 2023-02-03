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

// GET "/" ; /?order=asc ; /?order=desc
app.get("/videos", (req, res) => {
  const { order } = req.query;
  let query = "SELECT * FROM videos";
  if (!order) {
    query += " ORDER BY id ASC";
  }
  if (order === "asc") {
    query += " ORDER BY rating ASC";
  }
  if (order === "desc") {
    query += " ORDER BY rating DESC";
  }
  pool
    .query(query)
    .then((videos) => res.json(videos.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST "/"
app.post("/videos", (req, res) => {
  const addedVideoTitle = req.body.title.trim();
  const addedVideoUrl = req.body.url.trim();
  const todayDate = new Date().toISOString().slice(0, 10);
  const addedVideoRating = 0;

  if (!addedVideoTitle || !addedVideoUrl) {
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
app.get("/videos/:id", (req, res) => {
  const requestedVideoId = parseInt(req.params.id);
  if (!requestedVideoId) {
    res.sendStatus(404);
    return;
  }
  const query = "SELECT * FROM videos WHERE id=$1";
  pool
    .query(query, [requestedVideoId])
    .then((video) => res.json(video.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// DELETE "/{id}"
app.delete("/videos/:id", (req, res) => {
  const deletedVideoId = parseInt(req.params.id);
  if (!deletedVideoId) {
    res.sendStatus(404);
    return;
  }
  if (deletedVideoId < 10) {
    res.sendStatus(403); // no access
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
app.put("/videos/:id", (req, res) => {
  const requestedVideoId = parseInt(req.params.id);
  const changedVideoRating = parseInt(req.body.rating);
  console.log(requestedVideoId, changedVideoRating);
  if (!requestedVideoId) {
    res.sendStatus(404);
    return;
  }
  if (changedVideoRating < 0) {
    res.sendStatus(400);
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
