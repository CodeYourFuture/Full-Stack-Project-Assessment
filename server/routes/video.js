const express = require("express");
const { v4: uuid } = require("uuid");
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "cyf_videos",
});

const videoData = require("../../client/src/video-data.json");

const router = express.Router();

async function startApp() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

startApp();

router.get("/", (req, res) => {
  res.send(videoData);
});

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM cyf_videos");
    const videos = result.rows;
    res.send(videos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving videos from the database" });
  }
});

router.get("/:id", async (req, res) => {
  const videoId = parseInt(req.params.id);
  try {
    const result = await client.query(
      "SELECT * FROM cyf_videos WHERE id = $1",
      [videoId]
    );
    const video = result.rows[0];
    if (!video) {
      res.status(404).json({ error: "Video not found" });
    } else {
      res.send(video);
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving video from the database" });
  }
});

router.post("/", async (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    res.status(400).json({
      error: "Please make sure you have entered a title and a valid URL.",
    });
  } else {
    try {
      const result = await client.query(
        "INSERT INTO cyf_videos (id, title, url_link, rating) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuid(), title, url, rating]
      );
      const newVideo = result.rows[0];
      res.send(newVideo);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting video into the database" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const videoId = parseInt(req.params.id);
  try {
    await client.query("DELETE FROM cyf_videos WHERE id = $1", [videoId]);
    res.send({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting video from the database" });
  }
});

module.exports = router;
