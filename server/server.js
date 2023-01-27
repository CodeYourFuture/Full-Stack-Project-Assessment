const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

let filePath = __dirname + "../../exampleresponse.json";
const videoList = JSON.parse(fs.readFileSync(filePath, "utf-8"));
let maxID = Math.max(...videoList.map((c) => c.id));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET  all videos
app.get("/videos", (req, res) => {
  if (req.query.order === "asc") {
      videoList.sort((a, b) => a.rating - b.rating);
    } else {
      videoList.sort((a, b) => b.rating - a.rating);
    }
    res.json(videoList);
});

//GET all Videos in Ascending/Descending order
// app.get("/videos")

//POST new video
app.post("/videos", (req, res) => {
  const { title, url } = req.body;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url fields are required",
    });
  }
  if (!youtubeRegex.test(url)) {
    return res
      .status(400)
      .json({ result: "failure", message: "Invalid YouTube URL" });
  }
  const newVideo = {
    id: ++maxID,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
    date: new Date().toLocaleString(),
  };
  videoList.push(newVideo);
  fs.writeFileSync(filePath, JSON.stringify(videoList, null, 2));
  res.json(videoList);
});

//GET video by ID
app.get("/videos/:id", (req, res) => {
  let videoID = parseInt(req.params.id);
  let videos = videoList;
  let filteredVideo = videos.find((c) => c.id === videoID);
  if (!filteredVideo) {
    res.json({
      result: "failure",
      message: "No matching Results",
    });
  }
  res.json(filteredVideo);
});

//DELETE the video
app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = videoList.findIndex((c) => c.id === videoId);
  if (videoIndex < 0) {
    res.json({ result: "failure", message: "Video could not be deleted" });
    return;
  }
  videoList.splice(videoIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(videoList, null, 2));
  res.json({
    result: "success",
    videoList,
  });
});

//UPDATE rating of video
app.patch("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const newRating = req.body.rating;
  const videoIndex = videoList.findIndex((c) => c.id === videoId);
  if (videoIndex < 0) {
    res.json({ result: "failure", message: "Video could not be deleted" });
    return;
  }

  videoList[videoIndex].rating = newRating;
  fs.writeFileSync(filePath, JSON.stringify(videoList, null, 2));
  res.json(videoList[videoIndex]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
