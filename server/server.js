const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
  },
];

// GET
app.get("/", (req, res) => {
  res.send({ videos });
});

// POST
let newVideoId = videos[videos.length - 1]["id"] + 1;
app.post("/", (req, res) => {
  const addVideo = req.body;
  const { title, url, rating } = addVideo;

  const newVideo = {
    id: newVideoId,
    title: title,
    url: url,
    rating: rating,
  };

  videos.push(newVideo);
  newVideoId++;

  const isValid =
    title !== "" &&
    title !== undefined &&
    url !== "" &&
    url !== undefined &&
    rating !== "" &&
    rating !== undefined &&
    addVideo.hasOwnProperty("title") &&
    addVideo.hasOwnProperty("url") &&
    addVideo.hasOwnProperty("rating");

  if (isValid) {
    res
      .status(201)
      .send(
        `Your video has been successfully added ${JSON.stringify(addVideo)}`
      );
  } else {
    res.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

// GET/:id
app.get("/:id", (req, res) => {
  const videoId = +req.params.id;
  const video = videos.find((video) => video.id === videoId);
  if (video) {
    res.status(200).json({ video });
  } else {
    res.status(400).send({
      result: "failure",
      message: "There is no video matching with this id",
    });
  }
});

// DELETE
app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;
  const videoIndex = videos.findIndex((video) => video.id === videoId);
  if (videoIndex >= 0) {
    videos.splice(videoIndex, 1);
    res.status(200).json({ videos });
  } else {
    res.status(400).send({
      result: "failure",
      message:
        "There is no video matching with this id, so video could not be deleted",
    });
  }
});
