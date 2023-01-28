const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "*" }));
const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};
const videos = require("./exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
const maxId = Math.max(...videos.map((video) => video.id));
// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "to explain the endpoints" });
});

app.get("/videos", (req, res) => {
  res.send(videos);
});

app.post("/videos", (req, res) => {
  let title = req.body.title;
  let url = req.body.url;
  const newVideo = {
    id: maxId + 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  if (!req.body.title || !req.body.url) {
    return res
      .status(400)
      .json({ result: "ERROR", message: "Needed Title or URL for the Video" });
  } else if (!isValidYoutubeUrl(newVideo.url)) {
    return res.status(400).json({
      result: "ERROR",
      message: "Needed valid Youtube url",
    });
  }

  videos.push(newVideo);
  res.status(200).json(videos);
});

app.get("/video/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  let videoFilter = videos.filter((video) => video.id === videoId);
  res.json(videoFilter);
});

app.delete("/video/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  let videoIndex = videos.findIndex((video) => video.id === videoId);
  videos.splice(videoIndex, 1);
  // videos = videoFilter;
  console.log(videos.length);
  res.json({ id: videoId, message: "Video deleted." });
});
