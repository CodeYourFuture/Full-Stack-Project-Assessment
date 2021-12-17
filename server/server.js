const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const videos = require("./exampleresponse.json");

// GET all videos from this route "/".
app.get(["/", "/:videoId"], (req, res) => {
  const videoId = Number(req.params.videoId);
  const findVideoById = videos.find((video) => video.id === videoId);
  if (videoId) {
    if (findVideoById) {
      res.status(200).send(findVideoById);
    } else {
      res.status(404).send(`Video with the Id:${videoId} does not exist!`);
    }
  } else {
    res.status(200).send(videos);
  }
});

// POST a new video from this route "/".
app.post("/", (req, res) => {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;
  const newVideoRating = 0;
  const previousVideoId = videos[videos.length - 1].id;

  if (!newVideoTitle) {
    res.status(400).send("Please enter a valid video title.");
  } else if (!newVideoUrl) {
    res.status(400).send("Please enter a valid video url.");
  } else if (!newVideoUrl.includes("youtube")) {
    res.status(400).send("The url entered is incorrect.");
  }
  const newVideo = {
    id: previousVideoId + 1,
    title: newVideoTitle,
    url: newVideoUrl,
    rating: newVideoRating,
  };
  videos.push(newVideo);
  res.status(200).json({
    id: newVideo.id,
    message: "New Video Added!",
  });
});

// DELETE a video with an Id from this route "/1".
app.delete("/:videoId", (req, res) => {
  const videoId = Number(req.params.videoId);
  const videoIdCheck = videos.findIndex((video) => video.id === videoId);
  if (videoIdCheck === -1) {
    res.status(404).send(`Video with the Id:${videoId} does not exist!`);
  } else {
    videos.splice(videoIdCheck, 1);
    res.status(200).send("Video Deleted!");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
