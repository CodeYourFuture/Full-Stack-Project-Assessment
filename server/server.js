const express = require("express");
const cors = require("cors");
const youTubeVideos = require("../exampleresponse.json");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = [...youTubeVideos];

// enable CORS
app.use(cors());

// GET "/"
app.get("/", (req, res) => {
  const order = req.query.order;
  if (order) {
    return res.status(200).send(sortVideosByRating(videos, order));
  }
  res.status(200).send(sortVideosByRating(videos));
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

// DELETE "/{id}"
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

// PUT "/{id}" (update video rating)
app.put("/:id", (req, res) => {
  const videoId = Number(req.params.id);
  let plusOrMinus = 0;
  req.body.rating === "plus" ? (plusOrMinus = 1) : (plusOrMinus = -1);
  const videoToUpdate = videos.find((v) => v.id === videoId);
  if (videoToUpdate) {
    videoToUpdate.rating = videoToUpdate.rating + plusOrMinus;
    videos.splice(videos.indexOf(videoToUpdate), 1, { ...videoToUpdate });
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Video could not be updated." });
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
    rating: 0,
  };
}

function sortVideosByRating(videos, order) {
  const sortedVideos = videos.sort((video1, video2) => {
    switch (order) {
      case "asc":
        if (video1.rating < video2.rating) {
          return -1;
        } else if (video1.rating > video2.rating) {
          return 1;
        }
        return 0;
      case "desc":
      default:
        if (video1.rating < video2.rating) {
          return 1;
        } else if (video1.rating > video2.rating) {
          return -1;
        }
        return 0;
    }
  });
  return sortedVideos;
}
