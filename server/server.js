const express = require("express");
const youTubeVideos = require("./data/exampleresponse.json");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = [...youTubeVideos];

// GET "/"
app.get("/", (req, res) => {
  res.status(200).send(videos);
});

// POST "/"
app.use(express.json());
app.post("/", (req, res) => {
  const video = req.body;
  const result = validateVideoData(video);
  if (result.id) {
    const newVideo = buildVideoData(result.id, video);
    videos.push(newVideo);
    return res.status(201).send(result);
  }
  res.status(200).send(result);
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const videoId = Number(req.params.id);
  const video = videos.find((v) => v.id === videoId);
  video ? res.status(200).send(video) : res.sendStatus(404);
});

// DELET "/{id}"
app.delete("/:id", (req, res) => {
  const videoId = Number(req.params.id);
  const video = videos.find((v) => v.id === videoId);
  if (video) {
    const index = videos.indexOf(video);
    videos.splice(index, 1);
    return res.sendStatus(204);
  }
  res.status(400).send({
    result: "failure",
    message: "Video could not be deleted",
  });
});

// DATA VALIDATION
function validateVideoData(videoData) {
  return videoData.title && videoData.url
    ? {
        id: Math.floor(Math.random(0, 1) * 1000000),
      }
    : {
        result: "failure",
        message: "Video could not be saved",
      };
}

// BUILD VIDEO DATA
function buildVideoData(videoId, videoData) {
  return {
    id: videoId,
    title: videoData.title,
    url: videoData.url,
    rating:0,
  };
}
