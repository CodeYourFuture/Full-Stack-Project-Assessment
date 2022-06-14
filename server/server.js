const express = require("express");
const cors = require("cors");
const app = express();

const { v4: uuidv4 } = require("uuid");

const data = require("./exampleresponse.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = data;

// Gets all the videos
app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
    posted: new Date().toLocaleString(), // Gets the time when the video was posted,
  };

  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  videos.push(newVideo);
  res.json(newVideo.id);
});

app.get("/:id", (req, res) => {
  const videoFound = videos.find((video) => video.id === Number(req.params.id));
  res.json(videoFound);
});

app.delete("/:id", (req, res) => {
  const index = videos.findIndex((video) => video.id === Number(req.params.id));

  if (index < 0) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }

  videos.splice(index, 1);
  res.json({});
});
