const express = require("express");
const router = express.Router();

const dbEndpoints = (db) => {
  router.get("/", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM videos ORDER BY id ASC");
      console.log("Database connection successful");

      const dbVideos = [...result.rows];

      res.json(dbVideos);
    } catch (error) {
      console.error("Error fetching videos from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const { title, url } = req.body;

    if (title && url) {
      try {
        const result = await db.query(
          "INSERT INTO videos (title, url, uploadDate, rating) VALUES ($1, $2, CURRENT_TIMESTAMP, 0) RETURNING id",
          [title, url]
        );

        const id = result.rows[0].id;

        res.status(201).json({ id }); // Use 201 Created status for successful creation
      } catch (error) {
        console.error("Error adding video:", error.message);
        res.status(500).json({ error: "Failed to add video" });
      }
    } else {
      res.status(400).json({ error: "Video could not be saved" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
      await db.query("DELETE FROM videos WHERE id = $1", [id]);
      res.status(204).json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  router.post("/:videoId/rating", async (req, res) => {
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
        SET rating = COALESCE((SELECT SUM(likes) - SUM(dislikes) FROM videos WHERE id = $1), 0)
        WHERE id = $1
      `;

      await db.query(ratingQuery, [videoId]);

      res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
      console.error("Error updating rating:", error);
      res.status(500).json({ error: "Failed to update rating" });
    }
  });

  return router;
};

module.exports = dbEndpoints;
