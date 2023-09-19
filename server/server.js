const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });

app.use(cors());
app.use(express.json());

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = [];

const getVideosFromDatabase = async () => {
  try {
    const query = "SELECT * FROM videos";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Verileri getirirken hata oluştu:", error);
    throw error;
  }
};

const refreshVideos = async () => {
  try {
    const rows = await getVideosFromDatabase();
    videos = rows;
  } catch (error) {
    console.error("Verileri güncellerken hata oluştu:", error);
  }
};

app.get("/videos", async (req, res) => {
  try {
    await refreshVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Verileri getirirken hata oluştu." });
  }
});

app.post("/videos", async (req, res) => {
  const { title, youtubeVideoId } = req.body;

  try {
    const query =
      "INSERT INTO videos (title, youtubeVideoId) VALUES ($1, $2) RETURNING *";
    const values = [title, youtubeVideoId];
    const { rows } = await db.query(query, values);
    const newVideo = rows[0];

    videos.push(newVideo);

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Video eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Video eklenirken hata oluştu." });
  }
});

app.post("/videos/:id/upvote", async (req, res) => {
  const videoId = parseInt(req.params.id);

  try {
    const query =
      "UPDATE videos SET votes = votes + 1 WHERE id = $1 RETURNING *";
    const values = [videoId];
    const { rows } = await db.query(query, values);
    const updatedVideo = rows[0];

    const index = videos.findIndex((video) => video.id === videoId);
    if (index !== -1) {
      videos[index] = updatedVideo;
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Oy verirken hata oluştu:", error);
    res.status(500).json({ error: "Oy verirken hata oluştu." });
  }
});

app.post("/videos/:id/downvote", async (req, res) => {
  const videoId = parseInt(req.params.id);

  try {
    const query =
      "UPDATE videos SET votes = GREATEST(votes - 1, 0) WHERE id = $1 RETURNING *";
    const values = [videoId];
    const { rows } = await db.query(query, values);
    const updatedVideo = rows[0];

    const index = videos.findIndex((video) => video.id === videoId);
    if (index !== -1) {
      videos[index] = updatedVideo;
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Oy verirken hata oluştu:", error);
    res.status(500).json({ error: "Oy verirken hata oluştu." });
  }
});
