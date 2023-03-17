const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

require('dotenv').config();   // Dotenv to load environment variables

app.use(express.json());
app.use(cors()); 
const port = process.env.PORT || 5000;

// hard-coded values with the variables from your .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get all videos endpoint
app.get("/video", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM video");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search videos endpoint
app.get("/video/search", async (req, res) => {
  const videoSearch = req.query.term;
  try {
    const result = await pool.query(
      "SELECT * FROM video WHERE title LIKE $1",
      [`%${videoSearch}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create video endpoint
app.post("/video", async (req, res) => {
  const { title, url } = req.body;

  try {
    const result = await pool.query("SELECT * FROM video WHERE title = $1", [
      title,
    ]);
    if (result.rows.length > 0) {
      return res.status(400).json({ error: "Video already exists" });
    }
    // Check if video already exists by URL
    const urlResult = await pool.query("SELECT * FROM video WHERE url = $1", [
      url,
    ]);
    if (urlResult.rows.length > 0) {
      return res.status(400).json({ error: "Video already exists" });
    }
    await pool.query("INSERT INTO video (title, url) VALUES ($1, $2)", [
      title,
      url,
    ]);
    res.json({ message: "Video created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get video by id endpoint
app.get("/video/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM video WHERE id=$1", [
      videoId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Video not found!");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE //
app.delete("/video/:id", async (req, res) => {
  const vidId = req.params.id;
  try {
    const result = await pool.query("DELETE FROM video WHERE id=$1", [vidId]);
    if (result.rowCount === 0) {
      return res.status(404).send(`Video with id ${vidId} not found`);
    }
    res.send(`Video ${vidId} deleted!`);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is Listening in http://localhost:${port}`);
});
