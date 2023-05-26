const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;

const { Pool } = require("pg");

app.use(express.json());
app.use(cors());

// Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Store and retrieve videos
let videos = [];

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

// GET "/"
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos ORDER BY id ASC");
    console.log("Database connection successful");

    // Combine videos from the database with videos from the JSON file
    const combinedVideos = [...result.rows, ...videos];

    res.json(combinedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// POST "/"
app.post("/dbvideo", async (req, res) => {
  const { title, url } = req.body;

  if (title && url) {
    try {
      const result = await pool.query(
        "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0) RETURNING id",
        [title, url]
      );
      // const id = Math.floor(Math.random() * 1000000);
      const id = result.rows[0].id;
      const video = { id, title, url, rating, date: new Date() };
      videos.push(video);
      res.json({ id });
    } catch (error) {
      console.error("Error adding video:", error);
      res.status(500).json({ error: "Failed to add video" });
    }
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
});

// DELETE "/:id"
app.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const index = videos.findIndex((video) => video.id === id);

  if (index !== -1) {
    try {
      await pool.query("DELETE FROM videos WHERE id = $1", [id]);
      videos.splice(index, 1);
      res.status(204).json({ result: "success" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});

app.listen(port, () => console.log(`Listening on port {port}`));
