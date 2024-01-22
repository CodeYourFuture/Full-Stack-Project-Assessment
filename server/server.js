const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = 2000;

app.listen(2000);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "full-stack-project",
  password: "",
  port: 5432,
});

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", function (req, res) {
  pool.query("SELECT * FROM videos", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/videos/:id", function (req, res) {
  const matched = videos.find((video) => video.id === +req.params.id);
  if (!matched) return res.status(404).send("incorrect id");
  res.json(matched);
});

app.post("/videos", function (req, res) {
  const { title, url } = req.body;
  if (title && url) {
    pool.query("INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)", [title, url, 0], (error, results) => {
      if (error) {
        throw error;
      }
    });
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/videos/:id", (req, res) => {
  const videoId = +req.params.id;
  pool.query("DELETE FROM videos WHERE id = $1", [videoId], (error, results) => {
    if (error) {
      res.status(404).json({
        result: "failure",
        message: "Video could not be deleted",
      });
      throw error;
    }
  });
});
