const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// import { v4 as uuids4 } from "uuid";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
const videos = require("./exampleresponse.json");
const { response } = require("express");

const videoId = Math.floor(Math.random() * 1000000);
    let rating = Math.floor(Math.random() * 10000);
    


// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
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
  res.send(videoResult);
});

// POST //
app.post("/videos", (req, res) => {
  if (!req.body.title || !req.body.url.includes("www.youtube.com/watch?v=")) {
    res.status(400).json({ msg: "Please make sure to include title and url" });
    return;
  }

  const newVideos = {
    id: videoId,
    timeAdded: new Date().toLocaleDateString(),
    title: req.body.title,
    url: req.body.url,
    rating: rating,
  };
  videos.push(newVideos);
  res.json(videos);
});

app.get("/videos/:id", (req, res) => {
  let foundVideo = videos.find((video) => video.id == req.params.id);
  res.send(foundVideo);
});

// DELETE //
app.delete("/videos/:id",   (req, res) => {
  const deleteVideoId = parseInt(req.params.id);
  const foundVideoIndex = videos.findIndex(
    (video) => video.id === deleteVideoId
  );
  if (foundVideoIndex < 0) {
    res.sendStatus(440)
    return
  }
  videos.splice(foundVideoIndex, 1)
  res.send(`video with the id ${deleteVideoId} Has been deleted`)

});

 

app.listen(port, () => console.log(`Listening on port ${port}`));
