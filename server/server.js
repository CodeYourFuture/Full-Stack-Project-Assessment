const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
let videos = require("../client/src/exampleresponse.json");
const port = process.env.PORT || 3000;
const cors = require("cors");
const fs = require("fs");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// GET "/"  to get videos
app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

// POST "/videos"

app.post("/", (req, res) => {
  for (const key in req.body) {
    if (!validateURL(req.body[key].url)) {
      res.status(400).send(`Youtube Url is a valid url`);
    }

    if (!req.body[key]) {
      res.status(400).send("Please enter all fields");
    }

    if (!req.body[key].title) {
      res.status(400).send("Title is required");
    }

    if (!req.body[key].url) {
      res.status(400).send("Youtube Url is required");
    }

    const newEntry = {
      id: uuid.v4(),
      title: req.body[key].title,
      url: req.body[key].url,
    };

    videos.push(newEntry);

    res.json(videos);
  }
});

// "GET" with "/videos/:id"

app.get("/:id", (req, res) => {
  let videoId = req.params.id;

  let filteredVideo = videos.filter((vd) => vd.id === parseInt(videoId));

  res.json(filteredVideo);
});

// "DELETE" "/videos/:id"

app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }

  const filteredVideo = videos.filter((vd) => vd.id === videoId);

  if (!filteredVideo) {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }

  const index = videos.findIndex((a) => a.id === videoId);
  videos.splice(index, 1);

  res.json(filteredVideo);
});

// FUNCTION TO VALIDATE YOUTUBE URL

function validateURL(url) {
  var pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([a-zA-Z0-9_-]+)/;
  return pattern.test(url);
}
