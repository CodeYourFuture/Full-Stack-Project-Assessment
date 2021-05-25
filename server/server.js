const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(cors());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./Data/YouTubeData.json");

// GET "/"
app.get("/", (req, res) => {
  if (videos) {
    res.status(200).send(videos);
  } else {
    res.status(404).send({
      message: "No videos"
    })
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const videosId = videos.find(
    video => video.id === parseInt(req.params.id)
  );

  // validation video id
  if (videosId) {
    res.status(200).send(videosId);
  } else {
    res.status(404).send({
      message: "Video not found"
    })
  }
});

// Add new video
app.post("/", (req, res) => {
  const {
    title,
    url
  } = req.body;

  // validation title and url input
  if (
    !title ||
    !url
  ) {
    res.status(400).send({ message: "Please input correct video info" });
  } else {
    // generate new Id with increment of 1 of last id, disregard deleted id
    let newId = videos[videos.length - 1].id + 1;

    const newVideo = {
      id: newId,
      title,
      url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
  }
});

// Delete video by id
app.delete("/:id", (req, res) => {
  const videoIndex = videos.findIndex(
    (video) => video.id === parseInt(req.params.id)
  );
  const videoId = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );

  // validation video id for deletion
  if (videoId) {
    if (videoIndex >= 0) {
      videos.splice(videoIndex, 1);
      res.status(204).send();
      res.end();
    }
  } else {
    res.status(400).send({ message: "Deletion error, id not found" });
  }
});