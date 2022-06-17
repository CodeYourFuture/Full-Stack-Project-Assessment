const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("../client/src/exampleresponse.json");

// const cors = require("cors");
// app.use(cors());

app.use(express.json());

// Store and retrieve your videos from here
let videos = [...data];

app.get("/", function (req, res) {
  res.json(videos);
});

app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  const newVideo = {
    id: videos.length,
    title,
    url,
    rating: rating ? rating : 0,
  };

  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push(newVideo);
    res.json({ id: newVideo["id"] });
  }
});

app.get("/:id", function (req, res) {
  let id = req.params.id;
  let foundVideo = videos.filter((i) => i.id == id);

  res.json(foundVideo);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
