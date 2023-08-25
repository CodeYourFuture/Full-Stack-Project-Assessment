const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");

// GET "/" to get all the videos
app.get("/", (req, res) => {
  res.json(videos);
});

//POST "/" to post a new video

app.post("/", (req, res) => {
  const { title, url } = request.body;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved.",
    });
  } else {
    const videoId = videos.url.match(
      /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
    )[1];
    const newVideo = {
      id: videoId,
      title: title,
      url: url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(201).json({
      id: newVideo.id,
    });
  }
});
