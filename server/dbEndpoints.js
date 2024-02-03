// databaseEndpoints.js
const express = require("express");
const router = express.Router();
const { createTable, populateTable } = require("./databaseSetup");

// Create the "videos" table if it doesn't exist
createTable()
  .then(() => {
    // Populate the table from jsonData if it's empty
    return db.query("SELECT COUNT(*) FROM videos");
  })
  .then((countResult) => {
    if (countResult.rows[0].count === "0") {
      return populateTable();
    }
  })

    app.get("/videos", async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM videos ORDER BY id ASC");
        console.log("Database connection successful");

        const dbVideos = [...result.rows];

        res.json(dbVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: "Failed to fetch videos from server" });
      }
    });

    app.post("/videos", async (req, res) => {
      const { title, url } = req.body;
    
      if (title && url) {
        try {
          const result = await db.query(
            "INSERT INTO videos (title, url, uploadDate, rating) VALUES ($1, $2, CURRENT_TIMESTAMP, 0) RETURNING id",
            [title, url]
          );

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



module.exports = router;
