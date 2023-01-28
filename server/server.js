const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));
// const cors = require("cors");
// app.use(cors);

//let videos = JSON.parse(fs.readFileSync("videos.json", "utf-8"));
let videos = require("./videos.json");

const save = () => {
  fs.writeFileSync("videos.json", JSON.stringify(videos, null, 2));
};

function matchYoutubeUrl(url) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
}

// GET "/"

app.get("/", (req, res) => {
  res.send("Server is listening");
  //res.json(videos);
});

app.get("/videos", (req, res) => {
  res.json(videos);
});

app.get("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  const findVideo = videos.find((a) => a.id === id);

  if (!findVideo) {
    res.sendStatus(404);
    return;
  }
  res.send(findVideo);
});

// POST

const compulsoryFields = ["title", "url", "rating"];

app.post("/videos", (req, res) => {
  if (!compulsoryFields.every((cf) => req.body.hasOwnProperty(cf))) {
    res.status(401).send("not all compulsory fields supplied");
  }

  let newVideo = {
    id: Date.now(),
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  };

  if (!req.body.title) {
    res.status(400).send("Please enter a valid title");
    return;
  }

  if (matchYoutubeUrl(req.body.url) === false) {
    res.status(400).send("Please enter a full valid YouTube url");
    return;
  }

  if ((isNaN(req.body.rating) || !req.body.rating)) {
    res.status(400).send("Please enter a valid number as rating");
    return;
  }

  videos.push(newVideo);
  save();
  res.json(newVideo);
});

// Delete

app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.sendStatus(400);
    return;
  }
  const findVideo = videos.find((v) => v.id === videoId);
  if (!findVideo) {
    res.sendStatus(404);
    return;
  }
  const index = videos.findIndex((v) => v.id === videoId);
  videos.splice(index, 1);
  save(videos);
  res.send(findVideo);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
