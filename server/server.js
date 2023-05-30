const getVideos = require("./getVideos");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

const { Pool } = require("pg");

const db = new Pool({
  user: "xingying", // replace with you username
  host: "localhost",
  database: "videos_app",
  password: "",
  port: 5432,
});

// GET "/"
app.get("/", async (req, res) => {
  const videos = await getVideos(db);

  let orderedVideos = [...videos];

  const order = req.query.order;
  if (order === "asc") {
    orderedVideos.sort((a, b) => a.rating - b.rating);
  } else {
    orderedVideos.sort((a, b) => b.rating - a.rating);
  }

  res.json(orderedVideos);
});

// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;

  // Check if title and URL are provided
  if (!title || !url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Both title and URL are required." });
  }

  // Validate YouTube URL
  const youtubeUrlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
  if (!youtubeUrlRegex.test(url)) {
    return res
      .status(400)
      .json({ result: "failure", message: "Invalid YouTube URL." });
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
app.get("/:id", async (req, res) => {
  const videos = await getVideos(db);

  const videoId = parseInt(req.params.id);

  const video = videos.find((v) => v.id === videoId);
  if (!video) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found." });
  }

  res.json(video);
});

// DELETE "/:id"
app.delete("/:id", async (req, res) => {
  const videos = await getVideos(db);
  const videoId = parseInt(req.params.id);

  const index = videos.findIndex((v) => v.id === videoId);
  if (index === -1) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found." });
  }

  videos.splice(index, 1);

  res.json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
