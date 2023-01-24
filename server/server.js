const express = require("express");
const path = require("path");
const app = express();
const generateUniqueId = require("generate-unique-id");
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

function isValidYouTubeUrl(url) {
  if (url !== undefined || url !== "") {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    return url.match(regExp) ? url : false;
  }
}
// GET all videos
app.get("/", (req, res) => {
  videos.length > 0
    ? res.send(videos)
    : res
        .status(500)
        .send({ result: "failure", message: "No video is available" });
});

// POST new video
app.post("/", (req, res) => {
  const videoId = generateUniqueId({
    length: 6,
    useLetters: false,
  });
  if (req.body.title && req.body.url && isValidYouTubeUrl(req.body.url)) {
    let newVideo = {
      id: parseInt(videoId),
      title: req.body.title,
      url: req.body.url,
      postedAt: new Date(),
    };

    videos.push(newVideo);
    res.send(newVideo.id);
  } else {
    res
      .status(400)
      .send({ result: "failure", message: "Video could not be saved" });
  }
});

// GET video by id
app.get("/:id", (req, res) => {
  let video = videos.find(({ id }) => id === parseInt(req.params.id));
  if (video) {
    res.send(video);
  } else {
    res.status(400).send({
      result: "failure",
      message: "No matching result",
    });
  }
});

// DELETE video by id
app.delete("/:id", (req, res) => {
  let videoIndex = videos.findIndex(({ id }) => id === parseInt(req.params.id));
  if (videoIndex >= 0) {
    videos.splice(videoIndex, 1);
    res.send({});
  } else {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
