const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;
const { createTable, populateTable } = require("./databaseSetup");

require("dotenv").config();

app.use(express.json());
app.use(cors());

// Read data from the JSON file
const jsonFilePath = "./exampleresponse.json";
const dbVideos = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

let videos = [];

// GET "/" from the json file
app.get("/", async (req, res) => {
  try {
    const jsonVideos = [...dbVideos]; // Use dbVideos instead of videos
    console.log("Connection successful");
    res.json(jsonVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// GET "/" from the database
app.get("/videos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM videos ORDER BY id ASC");
    console.log("Database connection successful");

    const dbVideos = [...result.rows];

    res.json(dbVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// POST "/"
app.post("/videos", async (req, res) => {
  const { title, url } = req.body;

  if (title && url) {
    try {
      const insertQuery = await db.query(
        "INSERT INTO videos (title, url, uploadDate, rating) VALUES ($1, $2, CURRENT_TIMESTAMP, 0 ) RETURNING id",
        [title, url]
      );
      const result = await db.query(insertQuery, [title, url]);
      const id = result.rows[0].id;

      const video = { id, title, url, rating: 0, date: new Date() };
      videos.push(video);

      res.json({ id });
    } catch (error) {
      console.error("Error adding video:", error.message);
      res.status(500).json({ error: "Failed to add video" });
    }
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
});

// DELETE "/:id"
app.delete("/videos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const index = videos.findIndex((video) => video.id === id);

  if (index !== -1) {
    try {
      await db.query("DELETE FROM videos WHERE id = $1", [id]);
      videos.splice(index, 1);
      res
        .status(204)
        .json({ result: "success", message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});

// Example route to handle adding a like or dislike
app.post("/videos/:videoId/rating", async (req, res) => {
  const videoId = req.params.videoId;
  const { like, dislike } = req.body;

  try {
    let query = "";
    let queryParams = [];

    if (like) {
      query = "UPDATE videos SET likes = likes + 1";
      queryParams.push(videoId);
    }

    if (dislike) {
      query = "UPDATE videos SET dislikes = dislikes + 1";
      queryParams.push(videoId);
    }

    if (like || dislike) {
      // Update the likes or dislikes columns in the videos table
      await db.query(`${query} WHERE id = $1`, queryParams);
    }

    // Recalculate the rating based on likes and dislikes
    const ratingQuery = `
      UPDATE videos
      SET rating = (SELECT COALESCE(SUM(likes), 0) - COALESCE(SUM(dislikes), 0) FROM videos WHERE id = $1)
      WHERE id = $1
    `;

    await db.query(ratingQuery, [videoId]);

    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Failed to update rating" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
