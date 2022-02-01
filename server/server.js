const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
let videosData = require("../client/src/exampleresponse.json");
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET all videos
app.get("/", (req, res) => {
  res.send(videosData);
});

// ADD a video
app.post("/", (req, res) => {
  let newVideo = req.body;
  newVideo.id = Math.floor(Math.random() * 100000);
  if (!newVideo.title || !newVideo.url) {
    res.status(400).send({ msg: "Pease add a Title & URL from youtube !" });
  } else {
    videosData.push(newVideo);
    res
      .status(200)
      .send({ msg: `Video with id:${newVideo.id} has been added.` });
  }
});

// SEARCH video with text
// TESTED with `http://127.0.0.1:5000/search?term=never`
app.get("/search", (req, res) => {
  const searchTerm = req.query.term;

  const filteredVideos = videosData.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredVideos.length === 0) {
    res
      .status(400)
      .json({ msg: `No Videos found related to term ${searchTerm}` });
  }
  return res.json(filteredVideos);
});

// GET a Video with ID
app.get("/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const filteredVideo = videosData.find((video) => video.id === Id);

  if (filteredVideo.length === 0) {
    res.status(400).send({ msg: `Video with Id:${Id} not found !` });
  } else {
    res.status(200).send(filteredVideo);
  }
});

// DELETE a Video with ID
app.delete("/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const videoIndex = videosData.findIndex((video) => video.id == Id);

  if (videoIndex >= 0) {
    videosData.splice(videoIndex, 1);
    res.status(200).send({ msg: `Video with id:${Id} has been deleted.` });
  } else {
    res.status(400).send({ msg: `Video with Id:${Id} not found !` });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
