const express = require("express");
const app = express();
const videosData = require("./exampleresponse.json");
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = videosData;

app.get("/", (req, res) => {
  res.send(videosData);
});

app.post("/:id", (req, res) => {
  const addNewVideo = req.body;
  addNewVideo.id = Math.floor(Math.random() * 100000);
  if (!addNewVideo.title || !addNewVideo.url) {
    res.status(400).send({ msg: "Please add a Title & URL from Youtube !" });
  } else {
    videosData.push(addNewVideo);
    res.status(200).send({ msg: `Video:${addNewVideo.title} has been added.` });
  }
});

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const filterVideo = videosData.find((video) => video.id === videoId);

  if (filterVideo.length === 0) {
    res.status(400).send({ msg: `Video with:${videoId} not found!` });
  } else {
    res.status(200).send(filterVideo);
  }
});

app.delete("/:id", (req, res) => {
  const videoId = parseInt(req, params.id);
  indexVideo = videosData.findIndex((video) => video.id == videoId);

  if (indexVideo >= 0) {
    videosData.splice(indexVideo, 1);
    res
      .status(200)
      .send({ msg: `Video with id:${videoId} has been deleted. ` });
  } else {
    res.status(400).send({ msg: `Video with id:${videoId} not found! ` });
  }
});
