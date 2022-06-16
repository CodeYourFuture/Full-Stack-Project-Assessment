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
  const order = req.query.order;
  videos =
    order === "asc"
      ? videos.sort((a, b) => a.rating - b.rating)
      : videos.sort((a, b) => b.rating - a.rating);
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

const videoFound = (id) => videos.find((video) => video.id === Number(id));

app.get("/:id", (req, res) => {
  res.json(videoFound(req.params.id));
});

app.delete("/:id", (req, res) => {
  if (!videoFound(req.params.id)) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }

  videos = videos.filter((video) => video.id !== Number(req.params.id));

  res.json({});
});
