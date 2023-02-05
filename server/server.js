const express = require("express");
// const uuid = require("uuid");
const videos = require("./../client/src/exampleresponse.json");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.Pg_DB,
  ssl: true,
  port: 5432,
});

dotenv.config();

app.get("/videos", (req, res) => {
  const sql = "SELECT * FROM videos";
  const params = [];
  pool
    .query(sql, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// GET "/" gets all videos
// app.get("/videos", (req, res) => {
// Delete this line after you've confirmed your server is running
// res.send({ express: "Your Backend Service is Running" });
// res.send({ videos });
// });

// POST "/videos" add a video
app.post("/videos", (req, res) => {
  const newVideo = {
    // id: uuid.v4(),
    id: videos.length + 1,
    title: req.params.title,
    url: req.params.url,
  };

  if (!newVideo.title || !newVideo.url) {
    res.status(404).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  videos.push(newVideo);
  res.json({ videos });
});

// get a single video by id
app.get("/videos/:id", (req, res) => {
  const found = videos.some((video) => video.id === parseInt(req.params.id));

  if (found) {
    res.json(videos.filter((video) => video.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No video with the id of ${req.params.id}` });
  }
});

// Delete video by id
app.delete("/videos/:id", (req, res) => {
  const found = videos.some((video) => video.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Booking deleted",
      videos: videos.filter((video) => video.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
  }
});
