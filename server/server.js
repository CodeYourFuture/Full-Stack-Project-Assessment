const express = require("express");
const cors = require("cors");
const app = express();
//const allVideos = require("./exampleresponse.json");
const { Pool } = require("pg");
const dotenv = require("dotenv"); // Module for loading environment variables from a .env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// All videos
app.get("/", async (req, res) => {
  try {
    const order = req.query.order || "desc"; // Default sorting order is descending
    const query = `SELECT * FROM videos ORDER BY rating ${order}`;

    const result = await pool.query(query);
    const sortedVideos = result.rows;

    res.json(sortedVideos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new video
app.post("/", async (req, res) => {
  try {
    if (req.body.title.trim() === "" || req.body.url.trim() === "") {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    const order = req.query.order || "desc"; // Default order is descending

    const newVideo = {
      title: req.body.title,
      url: req.body.url,
      rating: 0,
    };

    const query =
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [newVideo.title, newVideo.url, newVideo.rating];

    const result = await pool.query(query, values);
    const createdVideo = result.rows[0];

    const allVideosQuery = `SELECT * FROM videos ORDER BY rating ${order}`;
    const allVideosResult = await pool.query(allVideosQuery);
    const allVideos = allVideosResult.rows;

    res.status(201).json(allVideos);
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //show video by Id
// app.get("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const find = allVideos.find((video) => video.id === id);
//   if (find) {
//     res.status(200).json(find);
//   } else res.status(404).json({ message: "not found" });
// });

app.delete("/:id", async (req, res) => {
  try {
    const videoId = Number(req.params.id);
    const order = req.query.order || "desc"; // Default order is descending

    const deleteQuery = "DELETE FROM videos WHERE id = $1";
    const deleteValues = [videoId];

    await pool.query(deleteQuery, deleteValues);

    const allVideosQuery = `SELECT * FROM videos ORDER BY rating ${order}`;
    const allVideosResult = await pool.query(allVideosQuery);
    const allVideos = allVideosResult.rows;

    res.json(allVideos);
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update the rating by ID
app.put("/:id", async (req, res) => {
  try {
    const videoId = Number(req.params.id);
    const newRating = Number(req.body.rating);
    const order = req.query.order || "desc"; // Default order is descending

    const updateQuery = "UPDATE videos SET rating = $1 WHERE id = $2";
    const updateValues = [newRating, videoId];

    await pool.query(updateQuery, updateValues);

    const allVideosQuery = `SELECT * FROM videos ORDER BY rating ${order}`;
    const allVideosResult = await pool.query(allVideosQuery);
    const allVideos = allVideosResult.rows;

    res.json(allVideos);
  } catch (error) {
    console.error("Error updating video rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
