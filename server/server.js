const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Get all videos
app.get("/", async (req, res) => {
  const { order, search } = req.query;
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    let filteredVideos = [...allVideos.rows];
    // Apply search filter if search query is provided
    if (search) {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    //Apply order filter
    if (order === "desc") {
      filteredVideos.sort((a, b) => b.ratingup - a.ratingup);
    } else {
      filteredVideos.sort((a, b) => a.ratingup - b.ratingup);
    }
    res.status(200).json(filteredVideos);
  } catch (error) {
    res.status(404).json({
      message: "something went wrong!",
    });
  }
});

// Post a video
app.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required."),
    body("url")
      .notEmpty()
      .withMessage("URL is required.")
      .isURL({ require_protocol: true })
      .withMessage("Please provide a valid URL.")
      .custom((value) => {
        // Custom validation: Check if URL is a YouTube URL
        const youtubeRegExp =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
        if (!youtubeRegExp.test(value)) {
          throw new Error("URL must be a valid YouTube URL.");
        }
        return true;
      }),
  ],
  async (req, res) => {
    // Check there is any errors or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, url, ratingup, ratingdown, date } = req.body;

    try {
      // Check if a video with the same URL already exists
      const existingURL = await pool.query(
        "SELECT * FROM videos WHERE url=$1",
        [url]
      );
      if (existingURL.rows.length > 0) {
        return res.status(409).json({
          message: "A video with this URL already exists.",
        });
      }
      const id = uuidv4();
      // If not, insert a new one
      const addVideos = await pool.query(
        "INSERT INTO videos(id, date, title, url, ratingup, ratingdown) VALUES($1, $2, $3, $4, $5, $6)",
        [id, date, title, url, ratingup, ratingdown]
      );
      res.status(201).json({
        message: "New video added successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong!",
      });
    }
  }
);

// Update video rating by incrementing votes_up
app.put("/ratingup/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const video = await pool.query(
      "UPDATE videos SET ratingup = ratingup + 1 WHERE id=$1",
      [id]
    );
    if (!video) {
      res.status(404).json({
        message: "There is no video with given data!",
      });
    } else {
      res.status(200).json({
        message: "Vote Up successful",
        isPositive: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "something went wrong!",
    });
  }
});

// Update video rating by incrementing votes_down
app.put("/ratingdown/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const video = await pool.query(
      "UPDATE videos SET ratingdown = ratingdown + 1 WHERE id=$1",
      [id]
    );
    if (!video) {
      res.status(404).json({
        message: "There is no video with given data!",
      });
    } else {
      res.status(200).json({
        message: "Vote Down successful",
        isPositive: false,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "something went wrong!",
    });
  }
});

//Delete a video
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedVideo = await pool.query("DELETE FROM videos WHERE id=$1", [
      id,
    ]);
    if (!deletedVideo) {
      res.status(404).json({
        message: "There is no video with given data!",
      });
    } else {
      res.status(200).json({
        message: "Video removed successfully",
        isPositive: true,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "something went wrong!",
    });
  }
});

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`My server is Listening on port ${port}`));
