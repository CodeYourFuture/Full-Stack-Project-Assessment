const { tableBodyClasses } = require("@mui/material");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./data.json");

// GET "/"
app.get("/", (req, res) => {
  res.status(200).json({ videos });
});

// POST //
app.post("/", (req, res) => {
  const newVideo = {
    id: videos[videos.length - 1].id + 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
    date: new Date().toLocaleDateString(),
  };

  if (!newVideo.title || !newVideo.url) {
    res
      .status(400)
      .json({ success: false, error: "Please provide all fields" });
  } else {
    videos.push(newVideo);
    res.status(200).json({ success: "true", videos });
  }
});

// GET /:id //
app.get("/:id", (req, res) => {
  const idToFind = Number(req.params.id);
  console.log(idToFind);
  const video = videos.find((vid) => vid.id === idToFind);
  console.log(video);

  videos.includes(video) === false
    ? res.status(404).json({
        success: false,
        error: `Video not found`,
      })
    : res.status(200).json({
        success: true,
        video,
      });
});

// DELETE /:id //
app.delete("/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  const indexOfVideoToDelete = videos.findIndex((vid) => vid.id === idToDelete);
  const videoToDelete = videos.find((vid) => vid.id === idToDelete);

  indexOfVideoToDelete === -1 || videos.includes(videoToDelete) === false
    ? res.status(404).json({
        success: false,
        error: `video not found`,
      })
    : videos.splice(indexOfVideoToDelete, 1);
  res.status(200).json({
    success: true,
    message: `Video wih ID: ${idToDelete} has been deleted`,
  });

  res.status(200).json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
