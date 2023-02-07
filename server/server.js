const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
let videos = require("./data/exampleresponse.json");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(videos);
});

app.get("/:id", (req, res) => {
  const video = videos.find(video => video.id === +req.params.id);
  res.json(video);
});

app.post("/", (req, res) => {
  const video = {
    id: Math.round(Math.random() * 1000),
    title: req.body.title,
    url: req.body.url,
    rating: 0
  };

  try {
    videos.push(video);

    res.json({ id: video.id });
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be saved"
    });
  }
});

app.patch("/:id/inc-rating", (req, res) => {
  const videoId = +req.params.id;

  try {
    videos = videos.map(video => video.id !== videoId ? video : { ...video, rating: video.rating + 1 })
    console.log(videos[0]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.patch("/:id/dec-rating", (req, res) => {
  const videoId = +req.params.id;

  try {
    videos = videos.map(video => video.id !== videoId ? video : { ...video, rating: video.rating - 1 })
    console.log(videos[0]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;

  try {
    videos = videos.filter(video => video.id !== videoId);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));