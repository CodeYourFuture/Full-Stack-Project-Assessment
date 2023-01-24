const express = require("express");
const path = require("path");
const app = express();
const generateUniqueId = require("generate-unique-id");
const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let videos = require("./exampleresponse.json");

// Validate url function
function isValidYouTubeUrl(url) {
  if (url !== undefined || url !== "") {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    return url.match(regExp) ? url : false;
  }
}

// GET all videos
app.get("/api", (req, res) => {
  videos.length > 0
    ? res.json(videos)
    : res
        .status(500)
        .send({ result: "failure", message: "No video is available" });
});

// POST new video
app.post("/api", (req, res) => {
  const videoId = generateUniqueId({
    length: 6,
    useLetters: false,
  });
  if (req.body.title && req.body.url && isValidYouTubeUrl(req.body.url)) {
    let newVideo = {
      id: parseInt(videoId),
      title: req.body.title,
      url: req.body.url,
      rating: 0,
      postedAt: new Date(),
    };

    videos.push(newVideo);
    res.send(newVideo);
  } else {
    res
      .status(400)
      .send({ result: "failure", message: "Video could not be saved" });
  }
});

// GET video by id
app.get("/api/:id", (req, res) => {
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
app.delete("/api/:id", (req, res) => {
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

// UPDATE video rating by id
app.patch("/api/:id", (req, res) => {
  let videoIndex = videos.findIndex(({ id }) => id === parseInt(req.params.id));
  if (videoIndex >= 0) {
    videos[videoIndex].rating = req.body.rating;
    res.send(videos);
  } else {
    res.status(400).send({
      result: "failure",
      message: "No matching result",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
