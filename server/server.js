const express = require("express");
const app = express();
const { Pool } = require("pg");
const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "cyf",
  password: "CYFStudent123",
  database: "videos",
};
const port = process.env.PORT || 5000;
//const videos = require("/home/cyf/Documents/GitHub/Full-Stack-Project-Assessment/client/src/exampleResponse.json");
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
const videos = `select  * from videos`;

// GET "/"

app.get("/", (req, res) => {
  pool
    .query(videos)
    .then((result) => res.send(result.rows))
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

//post request
let idCounter = 1;
let rating = 0;
app.post("/", (req, res) => {
  const video = req.body;
  if (video.title && video.url) {
    const newVideo = {
      id: idCounter++,
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

// delete request
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
