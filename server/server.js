const getVideos = require("./getVideos");
const express = require("express");
const bodyParser = require("body-parser");
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

// POST "/"
app.post("/", bodyParser.json(), async (req, res) => {
  console.log({ body: req.body });
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
    id: Math.floor(Math.random() * 900000) + 100000,
    title,
    url,
    rating: 0,
  };

  const query = `INSERT INTO videos (id, title, url, rating) VALUES (${newVideo.id}, '${newVideo.title}', '${newVideo.url}', ${newVideo.rating})`;
  console.log({ query });

  await db.query(query);

  res.json({ id: newVideo.id });
});

app.put("/:id", bodyParser.json(), async (req, res) => {
  console.log({ body: req.body });
  const videoId = parseInt(req.params.id);

  const { isUpVote } = req.body;

  // Get video with id
  // Get vote number of video
  // Add/Minus vote number by one
  // Update the new vote numer


  const query = `SELECT rating FROM videos WHERE id = ${videoId}`;
  const rows = await db.query(query).then((result) => {
    return result.rows;
  });
  const oldRating = rows[0].rating;
  const newRating = isUpVote ? oldRating + 1 : oldRating - 1;
  const updateQuery = `UPDATE videos SET rating = ${newRating} WHERE id = ${videoId}`;
  await db.query(updateQuery);

  res.json({ query, rows });
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

  // videos.splice(index, 1);
  const query = `DELETE FROM videos WHERE id = ${videoId}`;
  console.log({ query });

  await db.query(query);

  res.json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
