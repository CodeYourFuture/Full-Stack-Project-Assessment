const express = require("express");
const app = express();

let allVideos = require("../client/src/exampleresponse.json");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET all videos
app.get("/", (req, res) => {
  res.send(allVideos);
});

// ADD a video
app.post("/", (req, res) => {
  let newVideo = req.body;
  newVideo.id = Math.floor(Math.random() * 100000);
  if (!newVideo.title || !newVideo.url) {
    res.status(400).send({ msg: "Pease add a Title & URL from youtube !" });
  } else {
    allVideos.push(newVideo);
    res.status(200).send({ msg: `Video:${newVideo.title} has been added.` });
  }
});

// SEARCH video with query
app.get("/search", (req, res) => {
  const searchTerm = req.query.term;

  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredVideos.length === 0) {
    res
      .status(400)
      .json({ msg: `No Videos found related to term ${searchTerm}` });
  }
  return res.json(filteredVideos);
});

// SEARCH a Video with ID
app.get("/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const filteredVideo = allVideos.find((video) => video.id === Id);

  if (filteredVideo.length === 0) {
    res.status(400).send({ msg: `Video with Id:${Id} not found !` });
  } else {
    res.status(200).send(filteredVideo);
  }
});

// DELETE a Video with ID
app.delete("/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const videoIndex = allVideos.findIndex((video) => video.id == Id);

  if (videoIndex >= 0) {
    allVideos.splice(videoIndex, 1);
    res.status(200).send({ msg: `Video with id:${Id} has been deleted.` });
  } else {
    res.status(400).send({ msg: `Video with Id:${Id} not found !` });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
