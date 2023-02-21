const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./dbConnection");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = require("../exampleresponse.json");

// GET "/"
app.get("/videos", async (req, res) => {
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    res.json(allVideos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET a video by ID

app.get("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const video = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);

    if (video.rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(video.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// POST a new Video

app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res
        .status(400)
        .json({ result: "failure", message: "Title and URL are required" });
    }
    const newVideo = await pool.query(
      "INSERT INTO VIDEOS (title,url,rating) VALUES($1, $2, $3) RETURNING *",
      [title, url, 0]
    );
    res.json(newVideo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a video by id

app.delete("/videos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM videos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ result: "failure", message: "Video not found" });
    }
    res.json({ result: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      result: "failure",
      message: "An error occurred while deleting the video",
    });
  }
});

//Change the rating of the Videos

app.put("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vote = parseInt(req.body.vote);
    const { rows } = await pool.query(
      "UPDATE videos SET rating = rating + $1 WHERE id = $2 RETURNING *",
      [vote, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
