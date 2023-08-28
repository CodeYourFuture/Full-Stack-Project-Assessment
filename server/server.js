const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");

// GET "/" to get all the videos
app.get("/", (req, res) => {
  res.json(videos);
});

//POST "/" to post a new video

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved.",
    });
  } else {
    const videoId = url.match(
      /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
    )[1];
    const newVideo = {
      id: videoId,
      title: title,
      url: url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(201).json({
      id: newVideo.id,
    });
  }
});

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const deleteVideo = videos.findIndex((video) => video.id === videoId);
  if (deleteVideo === undefined) {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  } else {
    videos.splice(deleteVideo, 1);
    res.status(201).json({
      message: "Video deleted",
    });
  }
});

//GET BY id "/{id}"

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoFound = videos.find((video) => video.id === videoId);
  if (!videoFound) {
    res.status(404).json({
      message: "Video not found",
    });
  } else {
    res.json(videoFound);
  }
});
