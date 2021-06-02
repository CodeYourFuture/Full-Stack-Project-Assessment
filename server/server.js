const express = require("express");
const app = express();
require("dotenv").config();
const { Pool } = require("pg");

const password = process.env.PASSWORD;
const host = process.env.HOST;
const user = process.env.USER;
const database = process.env.DATABASE;

const dbConfig = {
  host,
  port: 5432,
  user,
  password,
  database,
};
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
//body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const pool = new Pool(dbConfig);
let videos = `select  * from videos order by rating desc`;

// GET "/"

app.get("/", (req, res) => {
  if (req.query.order === "asc") {
    videos = videos.replace("desc", "asc");
  }
  if (req.query.order === "desc") {
    videos = videos.replace("asc", "desc");
  }

  pool
    .query(videos)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => res.status(500).send(error));
});

// get video by id

app.get("/:id", async function (req, res) {
  const videoId = req.params.id;
  try {
    const video = await pool.query("select  * from videos where id=$1", [
      videoId,
    ]);
    if (video.rows.length > 0) {
      res.status(200).json(video.rows[0]);
    } else {
      res.status(404).json({ msg: `video with id= ${videoId} doesn't exist` });
    }
  } catch (error) {
    res.send(error.message);
  }
});

//post request add a video with title and url

let idCounter = 1;
let rating = 0;
app.post("/", (req, res) => {
  const video = req.body;
  if (video.title && video.url) {
    const newVideo = {
      id: ++idCounter, // ++idCounter because the previous id needs to be remembered
      title: video.title,
      url: video.url,
      rating: rating,
    };
    videos.push(newVideo);
    res.status(201).json({
      id: newVideo.id,
    });
  } else {
    res.send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

// delete  by id end point

app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = videos.findIndex((video) => video.id === videoId);
  if (videoIndex !== -1) {
    videos.splice(videoIndex);
    res.status(204).json(videos);
  } else {
    res.send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
