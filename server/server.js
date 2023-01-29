const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const pool = require("./db.js");
const bodyParser = require("body-parser");

// pool.connect();

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

app.get("/videos", async (req, res) => {
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    res.json(allVideos.rows);
  } catch (error) {
    console.error(error.message);
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
    console.error(error.message);
  }
});
app.post("/videos", async (req, res) => {
  const video = req.body;
  let insertQuery = `INSERT INTO videos(id, title, url, rating) 
   values(${video.id}, '${video.title}', '${video.url}', '${video.rating}')`;
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("video was successful added");
    } else {
      console.log(err.message);
    }
  });
});

app.put("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const videoTitle = req.body.title;
    const videoUrl = req.body.url;
    const videoRating = req.body.rating;
    const updateVideo = await pool.query(
      "UPDATE videos SET title =$1, url =$2 , rating =$3 WHERE id =$4",
      [videoId, videoTitle, videoUrl, videoRating]
    );
    res.json("Updated video");
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVideo = await pool.query("DELETE FROM videos WHERE id = $1", [
      id,
    ]);
    res.json("Video with ${id} was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/videos", (req, res) => {
  let newVideo = {
    id: parseInt(uuidv4()),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };

  const videoTitle = req.body.title;
  const videoUrl = req.body.url;
  let id = uuidv4();
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
  if (id === null && isNaN(id)) {
    res.status(404);
  }

  const isValidUrl = videoUrl.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );

  if (newVideo.title && isValidUrl) {
    videos.push(newVideo);
    res.status(200).json({
      message: ` new video with id ${newVideo.id} has been posted`,
    });
  }
});

app.get("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (videoId > 0) {
    res.json(videos.find((v) => v.id === videoId));
  }
  if (!videoId) {
    return res.status(400).json({ msg: "Invalid input" });
  }
});

// app.delete("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const videoIndex = videos.findIndex((v) => v.id === videoId);

//   if (videoIndex < 0) {
//     res
//       .status(404)
//       .json({ result: "failure", message: "Video could not be deleted" });
//     return;
//   } else {
//     videos.splice(videoIndex, 1);
//     res.send("video has been deleted");
//   }
// });
