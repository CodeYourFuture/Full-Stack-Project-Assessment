const express = require("express");
require("dotenv").config();
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD, 
  port: process.env.DBPORT, 
  ssl: true,
});

// app.use(cors()); 
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Youtube Videos" });
});

// Get all videos with vote counts
app.get("/videos", (req, res) => {
  pool
    .query(
      "SELECT v.id, v.title, v.url, v.upload_date, COALESCE(SUM(vv.vote), 0) AS votes " +
        "FROM videos v " +
        "LEFT JOIN video_votes vv ON v.id = vv.video_id " +
        "GROUP BY v.id, v.title, v.url, v.upload_date " +
        "ORDER BY votes DESC"
    )
    .then((result) => {
      const videosWithVotes = result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        url: row.url,
        uploadDate: row.upload_date,
        votes: row.votes,
      }));
      res.json(videosWithVotes);
    })
    .catch((error) => {
      console.error("Error retrieving videos:", error);
      res.status(500).json({
        result: "failure",
        message: "Error retrieving videos from the database",
      });
    });
});

// Get a video by ID
app.get("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query("SELECT id, title, url, rating FROM videos WHERE id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          result: "failure",
          message: "Video not found",
        });
      }
      res.json(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        result: "failure",
        message: "Error retrieving video from the database",
      });
    });
});

// Create a new video
app.post("/videos", (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  const insertQuery =
    "INSERT INTO videos (title, url, rating, upload_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id, title, url, rating, upload_date";
  const values = [title, url, rating];

  pool
    .query(insertQuery, values)
    .then((result) => {
      const newVideo = result.rows[0];
      console.log("New video uploaded:", newVideo);
      res.json(newVideo); // Respond with the new video's details
    })
    .catch((error) => {
      console.error("Error inserting video into the database:", error);
      res.status(500).json({
        result: "failure",
        message: "Error inserting video into the database",
        error: error.message,
      });
    });
});

// Delete a video by ID
app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query("DELETE FROM videos WHERE id = $1", [id])
    .then((result) => {
      if (result.rowCount === 0) {
        // No rows were affected, which means the video with the specified ID doesn't exist
        return res.status(404).json({
          result: "failure",
          message: "Video not found",
        });
      }
      console.log(`Video with ID ${id} deleted successfully`);
      res.json({ message: "Video deleted successfully" });
    })
    .catch((error) => {
      console.error(`Error deleting video with ID ${id}:`, error);
      res.status(500).json({
        result: "failure",
        message: "Error deleting video from the database",
      });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





