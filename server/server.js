const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "Kind Of Blue",
    url: "https://www.youtube.com/watch?v=NPIsXsrd9W0",
    rating: 230,
  },
  {
    id: 82653,
    title: "Walk On By",
    url: "https://www.youtube.com/watch?v=SQegEoll5Lc",
    rating: 2111,
  },
];

// GET "/"
app.get("/", (req, res) => {
  let orderedVideos = [...videos];

  const order = req.query.order;
  if (order === "asc") {
    orderedVideos.sort((a, b) => a.rating - b.rating); 
  } else {
    orderedVideos.sort((a, b) => b.rating - a.rating); 
  };

  res.json(orderedVideos);
});


// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;

  // Check if title and URL are provided
  if (!title || !url) {
    return res.status(400).json({ result: "failure", message: "Both title and URL are required." });
  }

  // Validate YouTube URL
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
  if (!youtubeUrlRegex.test(url)) {
    return res.status(400).json({ result: "failure", message: "Invalid YouTube URL." });
  }

  const newVideo = {
    id: Date.now(),
    title,
    url,
    rating: 0,
  };

  videos.push(newVideo);

  res.json({ id: newVideo.id });
});

// GET "/:id"
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  const video = videos.find((v) => v.id === videoId);
  if (!video) {
    return res.status(404).json({ result: "failure", message: "Video not found." });
  }

  res.json(video);
});

// DELETE "/:id"
app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  const index = videos.findIndex((v) => v.id === videoId);
  if (index === -1) {
    return res.status(404).json({ result: "failure", message: "Video not found." });
  }

  videos.splice(index, 1);

  res.json({});
});
