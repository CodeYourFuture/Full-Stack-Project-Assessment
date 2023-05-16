const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/videos"
app.get("/videos", async (req, res) => {
  try {
    const orderParam = req.query.order;
    let orderBy = "rating DESC"; // Default order is descending (desc)

    if (orderParam === "asc") {
      orderBy = "rating ASC";
    }

    const query = `SELECT * FROM videos ORDER BY ${orderBy}`;
    const result = await pool.query(query);
    const orderedVideos = result.rows;

    res.json(orderedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

// POST "/videos"
app.post("/videos", async (req, res) => {
  try {
    const { title, url, rating, date } = req.body;

    const query =
      "INSERT INTO videos (title, url, rating, date) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [title, url, rating, date];
    const result = await pool.query(query, values);
    const newVideo = result.rows[0];

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the video" });
  }
});

// DELETE "/videos/:id"
app.delete("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id;

    const query = "DELETE FROM videos WHERE id = $1 RETURNING *";
    const values = [videoId];
    const result = await pool.query(query, values);
    const deletedVideo = result.rows[0];

    if (deletedVideo) {
      res.json(deletedVideo);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the video" });
  }
});

// PUT "/videos/:id/rating"
app.put("/videos/:id/rating", async (req, res) => {
  try {
    const videoId = req.params.id;
    const { rating } = req.body;

    const query = "UPDATE videos SET rating = $1 WHERE id = $2";
    const values = [rating, videoId];
    await pool.query(query, values);

    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the rating" });
  }
});
