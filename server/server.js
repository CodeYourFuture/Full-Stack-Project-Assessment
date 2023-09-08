const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors'); 
app.use(cors()); 
app.use(express.json()); 

const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./DBConfig');



// GET
app.get("/api/videos", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM videos");
    const videos = result.rows;
    client.release();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

// POST 
app.post("/api/videos",async (req, res) => {
  const { title, url } = req.body;
 if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and URL must be provided",
    });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING id",
      [title, url, 0] 
    );
    const videoId = result.rows[0].id;
    client.release();
    res.status(201).json({ id: videoId });
  } catch (error) {
    console.error("Error adding a video:", error);
    res.status(500).json({ error: "An error occurred while adding the video" });
  }
});


// GET "/:id"
app.get("/api/videos/:id",async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM videos WHERE id = $1", [id]);
    const video = result.rows[0];

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  client.release();
  res.json(video);
} catch (error) {
  console.error("Error fetching a video:", error);
  res.status(500).json({ error: "An error occurred while fetching the video" });
}
});

// DELETE
app.delete("/api/videos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM videos WHERE id = $1", [id]);

  if (result.rowCount === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  client.release();
  res.json({});
} catch (error) {
  console.error("Error deleting a video:", error);
  res.status(500).json({ error: "An error occurred while deleting the video" });
}
});

app.listen(port, () => console.log(`Listening on port ${port}`));

