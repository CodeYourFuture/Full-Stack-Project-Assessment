const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("../exampleresponse.json");
const { uuid } = require("uuidv4");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Store and retrieve your videos from here
let videos = [...data];

app.get("/", function (req, res) {
  res.json(videos);
});

app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  const newVideo = {
    id: uuid(),
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
    res.status(200).json({ message: `Added video id: ${id}` });
  }
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.term;

  const filteredData = videos.filter((video) => {
    video.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filteredData.length === 0) {
      res
        .status(400)
        .json({ message: `No videos including ${searchTerm} found` });
    }
    return res.json(filteredData);
  });
});

app.get("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let foundVideo = videos.filter((i) => i.id == id);

  if (foundVideo) {
    res.status(200).json(foundVideo);
  } else {
    res.status(400).send({ message: `No video with id: ${id} found` });
  }
});

app.delete("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let foundVideo = videos.filter((i) => i.id == id);

  if (foundVideo) {
    return res.status(200).json({});
  } else {
    return res.status(400).json({
      result: "failure",
      message: `Video ${id} could not be deleted`,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
