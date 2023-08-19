const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await pool.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error while fetching videos" });
  }
});

app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    const rating = 0;
    const query =
      "INSERT INTO videos (title,url,rating) VALUES($1, $2, $3) RETURNING *";
    const values = [title, url, rating];
    const result = await pool.query(query, values);
    const newVideo = result.rows[0];
    res.status(201).json(newVideo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error while add video" });
  }
});

app.delete("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const query = "DELETE FROM videos WHERE id=$1 RETURNING *";
    const values = [videoId];
    const result = await pool.query(query, values);
    const deletedVideo = result.rows[0];
    if (deletedVideo) {
      res.json(deletedVideo);
    } else {
      res.status(404).json({
        message: "video not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error while delete video" });
  }
});

app.put("/videos/:id/rating", async (req, res) => {
  try {
    const videoId = req.params.id;
    const { rating } = req.body;
    const query = "UPDATE videos SET rating=$1 WHERE id=$2";
    const values = [rating, videoId];
    await pool.query(query, values);
    res.json({
      message: "rating updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error while update rating video" });
  }
});
