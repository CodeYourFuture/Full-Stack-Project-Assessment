require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

const videos = require("./exampleresponse.json");

app.use(express.json());

// GET "/"
app.get("/videos", (req, res) => {
  res.status(200).json(videos);
});

app.post("/videos", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url || !url.startsWith("https://www.youtube.com")) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const idList = videos.map((video) => video.id);
    const id = Math.max(...idList) + 1;
    const newVideo = {
      id,
      title,
      url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(201).json({ id });
  }
});

app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.");
  } else {
    res.status(200).json({ matchingVideo });
  }
});

app.delete("/videos/:id", (req, res) => {
  let id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });

  if (!matchingVideo) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
      id: id,
    });
  } else {
    const videoIndexToBeDeleted = videos.indexOf(matchingVideo);
    videos.splice(videoIndexToBeDeleted, 1);
    res.status(200).json({});
  }
});

app.put("/videos/:id", (req, res) => {
  const newVideo = req.body;
  let id = Number(req.params.id);
  const videoIndex = videos.findIndex((video) => {
    return video.id === id;
  });
  if (videoIndex === -1) {
    res.status(404).send("Video not found");
  } else {
    videos.splice(videoIndex, 1, newVideo);
    res.status(200).send({ newVideo });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
