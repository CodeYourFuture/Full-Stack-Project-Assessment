const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require ("cors");
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./videos.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  const newId = videos.length + 1;
  const video = {
    id: newId,
    title: req.body.title,
    url: req.body.url,
    rating:0,
  };
  if (req.body.title && req.body.url) {
    videos.push(video);
    res.status(200).send(video);
  } else
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
});

app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredVideos = videos.filter((video) => video.id === id);
  if (filteredVideos.length > 0) {
    res.status(200).json(filteredVideos);
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be found",
    });
  }
});

app.delete("/:id", function (req, res) {
  let id = Number(req.params.id);
  let deleteIndex = videos.findIndex((video) => video.id === id);
  if (deleteIndex >= 0) {
    videos.splice(deleteIndex, 1);
    res.status(200).json({});
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.put("/:id", function (req, res) {
  let id = Number(req.params.id);
  let videoIndex = videos.findIndex((video) => video.id === id);
  if (videoIndex >= 0) {
    videos[videoIndex].rating = Number(req.body.rating);
    res.status(200).json({});
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be updated",
    });
  }
});
