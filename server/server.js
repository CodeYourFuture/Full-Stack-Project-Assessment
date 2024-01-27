const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors'); 
app.use(cors()); 
app.use(express.json()); 
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:  { rejectUnauthorized: false },
});

// GET
app.get("/videos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos");
    const videos = result.rows;
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

// POST 
app.post("/videos",async (req, res) => {
  const { title, url } = req.body;
 if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and URL must be provided",
    });
  }

  try {
    const result = await pool.query(
   " INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING id",
      [title, url, 0] 
    );
    const videoId = result.rows[0].id;
    res.status(201).json({ id: videoId });
  } catch (error) {
    console.error("Error adding a video:", error);
    res.status(500).json({ error: "An error occurred while adding the video" });
  }
});


// GET "/:id"
app.get("/videos/:id",async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);
    const video = result.rows[0];

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  res.json(video);
} catch (error) {
  console.error("Error fetching a video:", error);
  res.status(500).json({ error: "An error occurred while fetching the video" });
}
});

// DELETE
app.delete("/videos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
   const result = await pool.query("DELETE FROM videos WHERE id = $1", [id]);

  if (result.rowCount === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  res.json({});
} catch (error) {
  console.error("Error deleting a video:", error);
  res.status(500).json({ error: "An error occurred while deleting the video" });
}
});

// POST a vote
app.post("/vote", async (req, res) => {
  const { video_id, vote_type } = req.body;
  try {
    await pool.query("BEGIN");
    const voteQuery = "INSERT INTO votes (video_id, vote_type) VALUES ($1, $2)";
    await pool.query(voteQuery, [video_id, vote_type]);

    const updateRating = (vote_type === 'upvote') ? 
                         "UPDATE videos SET rating = rating + 1 WHERE id = $1" :
                         "UPDATE videos SET rating = rating - 1 WHERE id = $1";
    await pool.query(updateRating, [video_id]);
    
    await pool.query("COMMIT");
    res.json({ message: "Vote recorded" });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "An error occurred while processing your vote" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
