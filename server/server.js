const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require("pg");

// Create a PostgreSQL connection pool using the DATABASE_URL environment variable
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

app.use(express.json());
app.use(cors());

function generateUniqueId() {
  return Math.floor(Math.random() * 1000000) + 1;
}

// GET "/"
app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await db.query(query);
    const orderedVideos = result.rows;

    const order = req.query.order;

    if (order === "asc") {
      orderedVideos.sort((a, b) => a.rating - b.rating);
    } else {
      orderedVideos.sort((a, b) => b.rating - a.rating);
    }

    res.json(orderedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      result: "failure",
      message: "Failed to fetch videos",
    });
  }
});

// POST "/"
app.post("/", async (req, res) => {
  const { title, category, url } = req.body;

  if (!title || !category || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  const newVideo = {
    id: generateUniqueId(),
    title,
    category,
    url,
    rating: 0,
  };

  try {
    const query =
      "INSERT INTO videos (id, title, category, url, rating) VALUES ($1, $2, $3, $4, $5)";
    await db.query(query, [
      newVideo.id,
      newVideo.title,
      newVideo.category,
      newVideo.url,
      newVideo.rating,
    ]);

    res.status(201).json({
      id: newVideo.id,
    });
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({
      result: "failure",
      message: "Failed to save video",
    });
  }
});

// GET "/{id}?action=thumbs-up"
app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM videos WHERE id = $1";
    const result = await db.query(query, [id]);
    let video = result.rows[0];

    if (!video) {
      return res.status(404).json({
        result: "failure",
        message: "Video not found",
      });
    }

    const action = req.query.action;

    if (action === "thumbs-up") {
      video.rating = parseInt(video.rating) + 1;
    } else if (action === "thumbs-down") {
      video.rating = parseInt(video.rating) - 1;
    }

    const updateQuery = "UPDATE videos SET rating = $1 WHERE id = $2";
    await db.query(updateQuery, [video.rating, id]);

    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      result: "failure",
      message: "Failed to fetch video",
    });
  }
});

// DELETE "/{id}"
app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM videos WHERE id = $1";
    await db.query(query, [id]);

    res.json({});
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({
      result: "failure",
      message: "Failed to delete video",
    });
  }
});

// GET "/category/:name?order=asc"
app.get("/category/:name", async (req, res) => {
  const { name } = req.params;
  const order = req.query.order;

  try {
    let query;
    let queryValues;

    if (name === "All videos") {
      query = "SELECT * FROM videos";
    } else {
      query = "SELECT * FROM videos WHERE category = $1";
      queryValues = [name];
    }

    const result = await db.query(query, queryValues);
    const categoryVideos = result.rows;

    if (categoryVideos.length === 0) {
      return res.status(404).json({
        result: "failure",
        message: "No videos found for the specified category",
      });
    }

    if (order === "asc") {
      categoryVideos.sort((a, b) => a.rating - b.rating);
    } else {
      categoryVideos.sort((a, b) => b.rating - a.rating);
    }

    res.json(categoryVideos);
  } catch (error) {
    console.error("Error fetching category videos:", error);
    res.status(500).json({
      result: "failure",
      message: "Failed to fetch category videos",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
