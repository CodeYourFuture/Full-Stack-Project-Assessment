const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

const videos = require("./exampleresponse.json");
let lastVideoId = Math.max(...videos.map((video) => video.id), 0);

app.get("/", (req, res) => {
  let orderedVideos = [...videos];

  // Check for the 'order' query parameter
  const order = req.query.order;
  if (order === "asc") {
    orderedVideos.sort((a, b) => a.votes - b.votes);
  } else if (order === "desc" || !order) {
    orderedVideos.sort((a, b) => b.votes - a.votes);
  }

  res.json(orderedVideos);
});

app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  const newVideo = {
    id: ++lastVideoId,
    title,
    url,
    rating,
  };

  videos.push(newVideo);
  res.json({ id: newVideo.id });
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  res.json(video);
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((video) => video.id === id);

  if (index === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  videos.splice(index, 1);
  res.json({});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
