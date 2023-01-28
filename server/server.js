const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5001;
const videosjson = require("./exampleresponse.json");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosjson;

const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (req, res) => {
  res.send(videos);
});

app.get("/videos/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let filterVideo = videos.filter((video) => video.id === id);

  if (filterVideo.length === 0) {
    return res.status(404).json("Video not found");
  }
  res.send(filterVideo);
});

// Add a new video
app.post("/videos", (req, res) => {
  let title = req.body.title.trim();
  let url = req.body.url.trim();

  let allVideosSorted = [...videos].sort((a, b) => (a.id > b.id ? 1 : -1));

  let lastIndex = allVideosSorted.length - 1;
  let lastId = allVideosSorted[lastIndex].id;
  let idPosition = lastId + 1;

  const newVideo = {
    id: idPosition,
    title: title,
    url: url,
    rating: 0,
  };
  // validation
  if (!newVideo.title && !newVideo.url) {
    return res.status(400).json("Please include a title and url");
  } else if (!isValidYoutubeUrl(newVideo.url)) {
    return res.status(400).json("Please include a valid YouTube url");
  } else {
    videos.push(newVideo);
    res.status(200).json(videos);
  }
});

//Delete video
app.delete("/videos/:id", function (req, res) {
  let id = parseInt(req.params.id); // int = integer

  let videoIndex = videos.findIndex((video) => video.id === id);

  if (videoIndex === -1) {
    return res.status(404).json("Video not found");
  }
  videos.splice(videoIndex, 1);
  res.send(videos);
});
