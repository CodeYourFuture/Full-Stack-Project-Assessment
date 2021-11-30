const express = require("express");
const cors = require("cors");
const videoData = require("../client/src/data/exampleresponse.json");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videoData;

// GET "/"
app.get("/", (req, res) => {
  if (videos) {
    res.status(201).send(videos);
  } else {
    res.status(404).send("Page not found");
  }
});

app.post("/", (req, res) => {
  const newVideo = req.body;

  if (!newVideo.title || !newVideo.url) {
    res.status(404).send({
      result: "failure",
      message: "Video could not be saved",
    });
    return;
  }

  const newVcData = {
    id: videos[videos.length - 1].id + 1,
    title: newVideo.title,
    url: newVideo.url,
  };

  if (newVideo) {
    videos.push(newVcData);
    res.status(201).send({ id: newVcData.id });
  } else {
    res.status(400).send("error");
  }
});

app.get("/:videoId", (req, res) => {
  const filteredVideo = videos.filter(
    (video) => video.id === +req.params.videoId
  );

  if (filteredVideo.length === 0) {
    res.status(404).send("video file not exist");
    return;
  }
  res.send(filteredVideo);
});

app.delete("/:videoId", (req, res) => {
  const index = videos.findIndex((video) => video.id === +req.params.videoId);
  
  if (index === -1) {
    res.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }

  videos.splice(index, 1);

  res.send({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
