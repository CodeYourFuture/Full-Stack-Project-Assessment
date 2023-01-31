const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const pool = require("./db.js");
const bodyParser = require("body-parser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
  })
);
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

//deleting videos
app.get("/delete-videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVideo = await pool.query("DELETE FROM videos WHERE id = $1", [
      id,
    ]);
    res.json("Video with ${id} was deleted");
  } catch (error) {
    res.send(err);
  }
});

app.get("/videos", async (req, res) => {
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    res.json(allVideos.rows);
  } catch (error) {
    res.send(err);
  }
});

app.get("/videos/:id", async (req, res) => {
  let videoId = parseInt(req.params.id);

  try {
    const video = await pool.query("SELECT * FROM videos WHERE id=$1", [
      videoId,
    ]);
    res.send(video);
  } catch (error) {
    res.send(err);
  }
});
app.post("/post-videos", async (req, res) => {
  const video = {
  
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  const videoTitle = req.body.title;
  const videoUrl = req.body.url;

  const videoRating = 0;
  if (videoTitle.length < 1) {
    res.send(400).json({
      result: "failure",
      msg: "A title is required.",
    });
    return;
  } else if (videoUrl.length < 1) {
    res.status(400).json({
      result: "failure",
      msg: "An url is required",
    });
    return;
  }


  let validUrl = videoUrl.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );

  const insertQuery = `INSERT INTO videos( title, url, rating)
   values('${video.title}', '${video.url}', '${video.rating}')`;

  if (validUrl) {
    pool.query(insertQuery, (err, result) => {
      if (!err) {
        res.json({
          message: ` new video with has been posted`,
        });
      } else {
        res.status(500).json({
          result: "failure",
          msg: "An url is required",
        });
      }
    });
  }
});
