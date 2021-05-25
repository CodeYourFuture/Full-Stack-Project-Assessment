const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const videos = require("/home/cyf/Documents/GitHub/Full-Stack-Project-Assessment/client/src/exampleResponse.json");
const cors = require("cors");
app.use(cors());
//body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// video sorter
function sorter(videos) {
  videos.sort((a, b) => {
    if (a.rating > b.rating) {
      return -1;
    } else {
      return 1;
    }
  });
}
// GET "/"
app.get("/", (req, res) => {
  res.status(200).json(videos);
});

// get video by id
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.filter((video) => video.id === videoId);
  if (video.length > 0) {
    res.status(200).json(video);
  } else {
    res.send({ msg: `video with id ${videoId} not found` });
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
