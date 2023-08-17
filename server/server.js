const express = require("express");
const app = express();

app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

let videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

app.get("/:id", function (req, res) {
  let searchId = Number(req.params.id);
  let selection = videos.filter((video) => video.id === searchId);
  if (selection && selection.length > 0) {
    res.status(200).json(selection[0]);
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be found",
    });
  }
});
app.delete("/:id", function (req, res) {
  let searchId = Number(req.params.id);
  let deleteIndex = videos.findIndex((video) => video.id === searchId);
  if (deleteIndex >= 0) {
    videos.splice(deleteIndex, 1);
    res.status(200).json({});
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  let maxId = Math.max(...videos.map((video) => video.id));
  let newRec = {
    id: maxId + 1,
    title: req.title,
    url: req.url,
    rating: 0,
  };
  videos.push(newRec);
  res.status(201).json({
    id: newRec.id,
  });
});