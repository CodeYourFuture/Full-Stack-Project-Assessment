const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const videos = require("../exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

// GET "/" all videos
app.get("/", (req, res) => {
  if (res.status(200)) {
    res.send(videos);
  } else {
    res.send("error!");
  }
});

//Get video by ID
app.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const videoWithId = videos.find((video) => video.id == videoId);
  videoWithId
    ? res.send(videoWithId)
    : res.status(404).send({ msg: "Video doesn't exist" });
});

//Add New Video
let tempId = Math.floor(Math.random() * 10000);
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;

  if (!title || !url || !url.includes("youtube") || !url.includes("watch?v=")) {
    return res
      .status(400)
      .send({ result: "failure", msg: "Video could not be saved" });
  }
  const newVideoToAdd = {
    id: tempId,
    title: title,
    url: url,
  };
  videos.push(newVideoToAdd);
  res.send({ id: newVideoToAdd.id });
});

app.delete("/:videoId", (req, response) => {
  const videoId = req.params.videoId;
  const videoIndex = videos.findIndex((video) => video.id == videoId);
  if (videoIndex === -1) {
    return response.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  videos.splice(videoIndex, 1);
  response.status(204).send({});
});
