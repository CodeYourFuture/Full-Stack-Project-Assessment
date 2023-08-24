const express = require("express");
const CORS = require("cors");
const urid = require("urid");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const pool = new Pool({
  user: "coder",
  password: "glasgow321!",
  host: "localhost",
  database: "videos_storage",
  port: 5432,
});
//

// GET "/"
app.get("/", (req, res) => {
  const getVideos = async () => {
    try {
      const videos = await pool.query("SELECT * from videos");
      console.log(videos.rows);
      res.json(videos.rows);
    } catch (err) {
      console.log(err);
    } finally {
      pool.end();
    }
  };
  getVideos();
});

// POST "/"
app.post("/", (req, res) => {
  if (req.body.title === "" || req.body.url === "") {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const newVideo = {
      id: Number(urid(6, "num")),
      title: req.body.title,
      url: req.body.url,
    };
    videos.unshift(newVideo);
    res.json(videos);
  }
});
app.get("/:id", (req, res) => {
  if (Number.isInteger(Number(req.params.id))) {
    const newVideo = videos.filter((vid) => vid.id === Number(req.params.id));
    newVideo.length == 0 ? res.json(videos) : res.json(newVideo);
  } else {
    res.json({
      result: "failure",
      message: "ID is not valid",
    });
  }
});
app.delete("/:id", (req, res) => {
  if (Number.isInteger(Number(req.params.id))) {
    const newVideo = videos.filter((vid) => vid.id !== Number(req.params.id));
    res.json(newVideo);
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted.",
    });
  }
});
