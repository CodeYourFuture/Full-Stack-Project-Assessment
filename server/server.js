const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const data = require("./exampleresponse.json");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", async (req, res) => {
  try {
    const videos = await pool.query(
      "SELECT * FROM videos ORDER BY rating DESC"
    );
    res.status(200).json(videos.rows);
  } catch (err) {
    console.error(err);
  }
});

// Add a new video
app.post("/", async (req, res) => {
  const { title, url } = req.body;
  const id = uuidv4();
  try {
    if (!title.trim() || !url.trim()) {
      res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    } else {
      await pool.query(
        `INSERT INTO videos(id, title, url, rating) VALUES($1, $2, $3, $4)`,
        [id, title, url, 0]
      );
      const videos = await pool.query(
        "SELECT * FROM videos ORDER BY rating DESC"
      );
      res.status(200).json(videos.rows);
    }
  } catch (err) {
    console.error(err);
  }
});

// Get a video with search in titles
app.get("/search", async (req, res) => {
  try {
    const { input } = req.query;
    const filteredVideos = await pool.query(
      `SELECT * FROM videos WHERE lower(title) LIKE $1 ORDER BY rating DESC;`,
      [`%${input.toLowerCase()}%`]
    );
    res.status(200).json(filteredVideos.rows);
  } catch (err) {
    console.error(err);
  }
});

// Get a video with id
// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const video = videos.find((video) => video.id.toString() === id);
//     if (!video) {
//       res.status(400).json("ID is not valid");
//     } else {
//       res.status(200).json(video);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// Delete a video with id
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM videos WHERE id = $1;`, [id]);
    const videos = await pool.query(
      "SELECT * FROM videos ORDER BY rating DESC"
    );
    res.status(200).json(videos.rows);
  } catch (err) {
    console.error(err);
  }
});

// change a video rating
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { changing } = req.body;
  try {
    await pool.query(
      `UPDATE videos SET rating=GREATEST(rating + $1, 0) WHERE id = $2;`,
      [changing, id]
    );
    const videos = await pool.query(
      "SELECT * FROM videos ORDER BY rating DESC"
    );
    res.status(200).json(videos.rows);
  } catch (err) {
    console.error(err);
  }
});
