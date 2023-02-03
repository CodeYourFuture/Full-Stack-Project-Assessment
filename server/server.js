const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const path = require("path");
const port = process.env.PORT || 5000;
const cors = require("cors");
const fs = require("fs");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build"))); //to connect client to the server

app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "video_lists",
  password: "CYFStudent123",
  port: 5432,
});

// GET "/"  to get videos
app.get("/videos", (req, res) => {
  const sort = req.query.sort;
  let sql;

  if (sort === "asc") {
    sql = "SELECT * FROM videos ORDER BY rating ASC";
  } else if (sort === "desc") {
    sql = "SELECT * FROM videos ORDER BY rating DESC";
  } else {
    sql = "SELECT * FROM videos ORDER BY rating DESC";
  }

  const params = [];
  pool
    .query(sql, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST "/" to post videos

app.post("/videos", (req, res) => {
  if (!validateURL(req.body.url)) {
    res.status(400).send(`Youtube Url is a valid url`);
  } else if (!req.body) {
    res.status(400).send("Please enter all fields");
  } else if (!req.body.title) {
    res.status(400).send("Title is required");
  } else if (!req.body.url) {
    res.status(400).send("Youtube Url is required");
  } else {
    const { id, title, rating, url } = req.body;

    const query =
      "INSERT INTO videos (id, title, rating, url) VALUES ($1, $2, $3, $4)";
    pool
      .query(query, [id, title, rating, url])
      .then(() => res.send("Movie added!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

// "GET" with "/videos/:id"

app.get("/videos/:id", (req, res) => {
  let videoId = req.params.id;

  pool
    .query("SELECT * FROM videos WHERE id=$1", [videoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// "DELETE" "/videos/:id"

app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }
  pool
    .query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => res.send(`Video ${videoId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
// FUNCTION TO VALIDATE YOUTUBE URL

function validateURL(url) {
  var pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([a-zA-Z0-9_-]+)/;
  return pattern.test(url);
}
