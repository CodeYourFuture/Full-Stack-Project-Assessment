const express = require("express");
const app = express();
const cors = require("cors");
const videos = require("../server/data/exampleresponse.json");
const uuid = require("uuid");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware
app.use(cors());
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];


// GET "/"
app.get("/", (req, res) => {
  res.json(videos)
});


// Search functionality
app.get("/search", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredVideo = videos.filter((video) => video.title.toUpperCase().includes(name.toUpperCase()));

    if (filteredVideo.length > 0) {
      return res.json(filteredVideo)
    } else {
      return res.status(404).json({ message: `No video found` })
    }
  }
});


// Create a new booking
app.post("/", (req, res) => {
  const newVideo = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
    timeSent: new Date().toLocaleString() // store a timestamp in each video object.
  };

  const uniqueVideoIdCheck = videos.some((video) => String(video.id) === req.body.id);

  if (uniqueVideoIdCheck) {
    return res.status(400).json({ message: "Video Id is already created, please select another video id" })
  }

  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json({ message: "Please fill in all fields", result: "Video could not be saved" });
  }

  videos.push(newVideo);
  res.json(videos);
})


// Read one video specified by an ID
app.get("/:id", (req, res) => {
  const selectedId = req.params.id;
  const isVideoIdFound = videos.some((video) => String(video.id) === selectedId);

  if (isVideoIdFound) {
    return res.json(videos.filter((video) => String(video.id) === selectedId));
  } else {
    return res.status(404).json({ message: `No video with the id of ${selectedId}` });
  }
});


// Delete a video
app.delete("/:id", (req, res) => {
  const isVideoIdFound = videos.some((video) => String(video.id) === req.params.id);
  let deletedVideo;

  if (isVideoIdFound) {
    videos.forEach((video, index) => {
      if (String(video.id) === req.params.id) {
        deletedVideo = video;
        videos.splice(index, 1);
      }
    })
    return res.json({ msg: `Video id ${req.params.id} deleted on ${new Date().toLocaleString()}`, deletedVideo });
  } else {
    return res.status(404).json({ message: `No video with the id of ${req.params.id}`, result: "Video could not be deleted" });
  }
});