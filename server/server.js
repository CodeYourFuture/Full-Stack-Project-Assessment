const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3005;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let videos = require("../exampleresponse.json");

// GET ALL VIDEOS
app.get("/", (req, res) => {
  res.json(videos);
});

// POST VIDEO
app.post("/", (req, res) => {
  const { title, url } = req.body;
  let randomID = Math.floor(100000 + Math.random() * 900000);
  let randomRating = Math.floor(100 + Math.random() * 900);

  const newVideo = {
    id: randomID,
    title: title,
    url: url,
    rating: randomRating,
  };

  if (!newVideo.title || !newVideo.url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }

  videos.push(newVideo);
  res.status(200).json({ message: "New video added", videos });
});

// GET BY ID
app.get("/:id", (req, res) => {
  const foundVideo = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );

  foundVideo
    ? res.json(foundVideo)
    : res.status(400).json({ message: `Video ${req.params.id} not found` });
});

// DELETE BY ID
app.delete("/:id", (req, res) => {
  const foundVideo = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );

  if (foundVideo) {
    videos = videos.filter((video) => video.id !== parseInt(req.params.id));
    res.json({ message: `Video ${req.params.id} deleted` });
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be found" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
