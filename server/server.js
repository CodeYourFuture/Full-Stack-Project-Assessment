const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const videosPool = require("./DBConfig");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("your server is live");
});
app.get("/videos", async (req, res) => {
  try {
    const allVideos = await videosPool.query("SELECT * FROM videos");
    res.json(allVideos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const item = await videosPool.query("SELECT * FROM videos WHERE id = $1", [
      videoId,
    ]);

    if (item.rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      res.json(item.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});



app.post("/videos", async (req, res) => {
  const { title, url } = req.body;
  try {
    if (!title || !url) {
      return res
        .status(400)
        .json({ error: "Please provide both title and URL" });
    }

    
    const newVideo = {
      title,
      url,
      rating: 0,
      timestamp: new Date().toISOString(),
    };

    const insertedVideo = await videosPool.query(
      "INSERT INTO videos (title, url, rating, timestamp) VALUES ($1, $2, $3, $4) RETURNING *",
      [newVideo.title, newVideo.url, newVideo.rating, newVideo.timestamp]
    );

    res.status(201).json({
      message: "New video added!",
      video: insertedVideo.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});



app.delete("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const deletedVideo = await videosPool.query(
      "DELETE FROM videos WHERE id = $1 RETURNING *",
      [videoId]
    );

    if (deletedVideo.rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      res.json({
        message: "Video deleted",
        deletedVideo: deletedVideo.rows[0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ------------------- Rate Video -------------------

app.put("/rate/:id/:type", async (req, res) => {
  const videoId = req.params.id;
  const ratingType = req.params.type;

  if (ratingType !== "up" && ratingType !== "down") {
    res.status(400).json({ error: "Invalid rating type" });
    return;
  }

  try {
    const currentRatingResult = await videosPool.query(
      "SELECT rating FROM videos WHERE id = $1",
      [videoId]
    );

    if (currentRatingResult.rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      const currentRating = currentRatingResult.rows[0].rating;

      let newRating = currentRating;
      if (ratingType === "up") {
        newRating++;
      } else if (ratingType === "down") {
        newRating--;
      }

      const updatedVideo = await videosPool.query(
        "UPDATE videos SET rating = $1 WHERE id = $2 RETURNING *",
        [newRating, videoId]
      );

      res.json({ rating: updatedVideo.rows[0].rating });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));