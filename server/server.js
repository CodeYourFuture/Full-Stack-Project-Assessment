const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());
const videos = require("./movieData.json");

const videoId = Math.floor(Math.random() * 1000000);
// validating url
function validateYouTubeUrl(url) {
  if (url !== undefined || url !== "") {
    let regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    return url.match(regExp);
  }
}
// get all sorted videos
app.get("/videos", (req, res) => {
  if (req.query.order === "asc") {
    videos.sort((a, b) => a.rating - b.rating);
  } else {
    videos.sort((a, b) => b.rating - a.rating);
  }
  res.send(videos);
});

// Post videos

app.post("/videos", (req, res) => {
  if (req.body.title && req.body.url && validateYouTubeUrl(req.body.url)) {
    let addedVideo = {
      id: parseInt(videoId),
      title: req.body.title,
      url: req.body.url,
      rating: 0,
      date: new Date().toLocaleDateString(),
    };
    videos.push(addedVideo);
    res.status(200).send(addedVideo);
  } else {
    res.status(400).send({ message: " video can not be uploaded" });
  }
});

// get video by id
app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let filteredVideos = videos.find((video) => video.id === id);

  if (!filteredVideos) {
    res.status(404).send(`No video with the ${id} is found`);
    return;
  }
  res.send(filteredVideos);
});

//  deleting video by
app.delete("/videos/:id", (req, res) => {
  const delVideoId = parseInt(req.params.id);
  const foundVideoIndex = videos.findIndex((video) => video.id === delVideoId);
  if (foundVideoIndex < 0) {
    res.sendStatus(440);
    return;
  }
  videos.splice(foundVideoIndex, 1);

  res.send(videos)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
