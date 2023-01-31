
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("../exampleresponse.json");


const videoId = Date.now();


// Get//
app.get("/videos", (req, res) => {
  res.json(videos);
});

// SEARCH //
app.get("/videos/search", (req, res) => {
  const videoSearch = req.query.term;
  const videoResult = videos.filter((video) =>
    video.title.toLowerCase().includes(videoSearch.toLowerCase())
  );
  if (!videoResult.length) {
    res.status(404).json({ msg: "Video not found!" });
    return;
  }
  res.send(videoResult);
});

function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}
// POST //
app.post("/videos", (req, res) => {
  if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
    res.status(400).json({ msg: "include  title and valid url" });
    return;
  }

  const newVideos = {
    id: videoId,
    timeAdded: new Date().toLocaleDateString(),
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  };
  videos.push(newVideos);
  res.json(videos);
});

app.get("/videos/:id", (req, res) => {
  let searchVideo = videos.find((video) => video.id == req.params.id);
  res.send(searchVideo);
});

// DELETE //
app.delete("/videos/:id", (req, res) => {
  const deleteVideoId = parseInt(req.params.id);
  const searchVideoIndex = videos.findIndex(
    (video) => video.id === deleteVideoId
  );
  if (searchVideoIndex < 0) {
    res.sendStatus(404);
    return;
  }
  videos.splice(searchVideoIndex, 1);
  res.send(`video id ${deleteVideoId} Has been deleted`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));