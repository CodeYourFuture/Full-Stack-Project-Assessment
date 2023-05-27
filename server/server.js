const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5500;
const app = express();
const { Pool } = require("pg");
app.use(cors());
app.use(bodyParser.json());

const videosPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // ssl: false,
});

fs.readFile("./exampleresponse.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading example response file:", err);
  } else {
    try {
      videos = JSON.parse(data);
      // console.log("Example response loaded:", videos);
    } catch (parseError) {
      console.error("Error parsing example response:", parseError);
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).json(videos);
});

app.get("/videos", async (req, res) => {
  const sortType = req.query.sort;
  try {
    let query = "SELECT * FROM videos";
    if (sortType !== "asc") {
      query += " ORDER BY ratings DESC";
    } else {
      query += " ORDER BY ratings";
    }
    const allVideos = await videosPool.query(query);
    res.json(allVideos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/videos/:id/like", async (req, res) => {
  const videoId = req.body.id;
  const likeQuery =
    "UPDATE videos SET ratings = ratings + 1 WHERE id = $1 RETURNING *";
  try {
    const { rows } = await videosPool.query(likeQuery, [videoId]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      const updatedVideo = rows[0];
      res.status(200).json(updatedVideo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/videos/:id/dislike", async (req, res) => {
  const videoId = req.body.id;
  const dislikeQuery =
    "UPDATE videos SET ratings = ratings - 1 WHERE id = $1 RETURNING *";
  try {
    const { rows } = await videosPool.query(dislikeQuery, [videoId]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      const updatedVideo = rows[0];
      res.status(200).json(updatedVideo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.delete("/videos/:id", async (req, res) => {
  const videoId = parseInt(req.params.id);
  try {
    await videosPool.query("DELETE FROM videos WHERE id = $1", [videoId]);
    res.status(200).json({ id: videoId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/videos", async (req, res) => {
  const videoTitle = req.body.title;
  const videoUrl = req.body.url;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

  if (!videoTitle) {
    return res
      .status(400)
      .json({ message: "Please add a title for your video" });
  }
  if (!videoUrl) {
    return res.status(400).json({ message: "Please enter a URL" });
  }
  if (req.body.url.match(youtubeRegex) === null) {
    return res.status(400).json({ message: "Please add a valid Youtube URL" });
  }

  const currentDate = new Date();
  const uploadDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  const ratings = 0;

  try {
    const existingVideo = await videosPool.query(
      "SELECT * FROM videos WHERE url = $1",
      [videoUrl]
    );
    if (existingVideo.rows.length > 0) {
      return res.status(409).json({ error: "Video already exists" });
    }

    const insertedVideo = await videosPool.query(
      `INSERT INTO videos (title, url, ratings, upload_date)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, url, ratings, upload_date`,
      [videoTitle, videoUrl, ratings, uploadDate]
    );

    const newVideo = insertedVideo.rows[0];
    return res.json(newVideo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
