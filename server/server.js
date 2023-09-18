const express = require("express");

var isUrl = require("is-url");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
app.get("/videos", async (req, res) => {
  try {
    const query = "SELECT * FROM videos ORDER BY id";
    const result = await pool.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching videos" });
  }
});
app.get("/videos/:id", async function (req, res) {
  const videoId = parseInt(req.params.id);
  try {
    const result = await pool.query("SELECT * FROM videos WHERE id = $1 ", [
      videoId,
    ]);
    if (result.rowCount === 1) {
      res.status(200).send(`Video ${videoId}!`);
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({
        result: "failure",
        message: "Please check ID number",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: "error",
      message: "Internal server error",
    });
  }
});
app.delete("/videos/:videosId", async function (req, res) {
  const videosId = Number(req.params.videosId);
  console.log(videosId);
  try {
    const result = await pool.query("DELETE FROM videos WHERE id=$1", [
      videosId,
    ]);
    if (result.rowCount === 1) {
      res.status(200).send(`Video ${videosId} deleted!`);
      res.json(result.rows);
    } else {
      res.status(404).json({
        result: "failure",
        message: "Video could not be deleted",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "error",
      message: "Internal server error",
    });
  }
});

app.post("/videos", async function (req, res) {
  const newVideo = {
    title: req.body.title,
    url: req.body.url,
    rating: Math.floor(Math.random() * 100),
  };

  try {
    if (req.body.title && req.body.url && isUrl(req.body.url)) {
      const result = await pool.query(
        "INSERT INTO videos (title, url, rating) VALUES ($1, $2,$3)",
        [newVideo.title, newVideo.url, newVideo.rating]
      );
      res.status(200).json(result.rows);
    } else res.status(400).send("Please check the fields have been correctly filled in");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "error",
      message: "Internal server error",
    });
  }
});
app.put("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const { rating } = req.body;
    await pool.query("UPDATE videos SET rating = $1 WHERE id = $2", [
      rating,
      videoId,
    ]);
    res.status(200).json({
      result: "success",
      message: "Rating updated successfully",
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({
      result: "error",
      message: "Internal server error",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
