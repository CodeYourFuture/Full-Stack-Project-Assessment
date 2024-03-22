const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ result: "failure", message: "Failed to fetch videos" });
  }
});

app.post("/", async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  try {
    const queryText = 'INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *';
    const values = [title, url];

    const result = await db.query(queryText, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const query = "SELECT * FROM videos WHERE id = $1";
    const { rows } = await db.query(query, [videoId]);

    if (rows.length === 0) {
      return res.status(404).json({ result: "failure", message: "Video not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(500).json({ result: "failure", message: "Failed to fetch video" });
  }
});

app.delete("/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const query = "DELETE FROM videos WHERE id = $1";
    await db.query(query, [videoId]);

    res.json({});
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ result: "failure", message: "Failed to delete video" });
  }
});

module.exports = app;
