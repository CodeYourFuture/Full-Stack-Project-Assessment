const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;
const fs = require("fs");
const cors = require ("cors")
app.use(cors)

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = JSON.parse(fs.readFileSync("videos.json", "utf-8"));

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
  res.json(videos);
});

app.get("/:id", (req, res) => {
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

app.post("/", (req, res) => {
  if (!compulsoryFields.every((cf) => req.body.hasOwnProperty(cf))) {
    res.status(401).send("not all compulsory fields supplied");
  }

  let newVideo = {
    id: Date.now(),
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  };

  if (!req.body.title || !req.body.url || !req.body.rating) {
    res.status(400).send("Please enter a valid title, url and rating");
    return;
  }

  if (matchYoutubeUrl(req.body.url) === false) {
    res.status(400).send("Please enter a full valid YouTube url");
    return;
  }

  if (isNaN(req.body.rating)) {
    res.status(400).send("Please enter a valid number as a rating");
  }

  videos.push(newVideo);
  save();
  res.json(newVideo);
});

// Delete

app.delete("/:id", (req, res) => {
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
  save();
  res.send(findVideo);
});
