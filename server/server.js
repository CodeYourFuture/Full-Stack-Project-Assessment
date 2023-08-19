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


app.use(cors());
app.use(express.json());

function generateUniqueId() {
  return Math.floor(Math.random() * 1000000) + 1;
}



// GET "/"
app.get("/", async (req, res, next) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await db.query(query);
    const videos = result.rows;
    res.json(videos);
  } catch (error) {
    next(error);
  }
});

// POST "/"
app.post("/", async (req, res, next) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Both title and url are required" });
  }

  const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;

  if (!youtubeUrlPattern.test(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const currentDate = new Date();

  const newVideo = {
    id: generateUniqueId(),
    title,
    url,
    rating: 0,
    uploadedAt: currentDate.toLocaleString(),
  };

  try {
    const insertQuery =
      "INSERT INTO videos (id, title, url, rating, uploadedAt) VALUES ($1, $2, $3, $4, $5) RETURNING *";
     await db.query(insertQuery, [
      newVideo.id,
      newVideo.title,
      newVideo.url,
      newVideo.rating,
      newVideo.uploadedAt,
    ]);

    res.status(201).json({
      id: newVideo.id,
    });
  } catch (error) {
    next(error);
  }
});


// GET "/{id}?action=thumbs-up"
app.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM videos WHERE id = $1";
    const result = await db.query(query, [id]);
    const video = result.rows[0];

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
    next(error);
  }
});

// DELETE "/{id}"
app.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteQuery = "DELETE FROM videos WHERE id = $1";
    await db.query(deleteQuery, [id]);

    res.json({});
  } catch (error) {
    next(error);
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));