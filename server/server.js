const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
let videos = require("../client/src/exampleresponse.json");
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); //for post req

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

/*
// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});*/

//This brings all the videos
app.get("/", (req, res) => {
  res.json(videos);
});
//Add a new video

app.post("/", function (req, res) {
  const getNewVideo = req.body;
  getNewVideo.id = Math.floor(Math.random() * 10000);

  if (getNewVideo.title && getNewVideo.url) {
    videos.push(newVideo);
    res.send({ id: newVideo.id });
  } else {
    res.status(400).send({
      messageResult: "your Video could not be Added",
    });
  }
});

//To get an individual video
app.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const filteredVideoId = videos.find((video) => video.id === id);

  if (filteredVideoId) {
    res.json(filteredVideoId);
  } else {
    res.status(404).send({
      messageResult: "Your Video not found",
    });
  }
});
//Deleting an ID specified video
app.delete("/:id", function (req, res) {
  const DeleteVideoIndex = videos.findIndex(
    (video) => video.id === parseInt(req.params.id)
  );

  if (DeleteVideoIndex >= 0) {
    videos.splice(DeleteVideoIndex, 1);
    res.sendStatus(200);
  } else {
    res.send({
      messageResult: "Video could not be deleted",
    });
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
