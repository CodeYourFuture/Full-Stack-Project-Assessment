const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

dotenv.config();
app.use(express.json());
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await pool.query(query);
    const videos = result.rows;
    res.status(200).json({ videos });
  } catch (error) {
    console.log("error")
  }
});

// POST OLD //
// app.post("/", (req, res) => {
//   const newVideo = {
//     id: videos[videos.length - 1].id + 1,
//     title: req.body.title,
//     url: req.body.url,
//     rating: 0,
//     date: new Date().toLocaleDateString(),
//   };

//   if (!newVideo.title || !newVideo.url) {
//     res
//       .status(400)
//       .json({ success: false, error: "Please provide all fields" });
//   } else {
//     videos.push(newVideo);
//     res.status(200).json({ success: "true", videos });
//   }
// });


// POST NEW
app.post("/", async (request, response) => {
  try {
    const { title, url } = request.body;
    const rating = 0;
    const query =
      "INSERT INTO videos (title, url, rating) VALUES ($1,$2,$3) RETURNING *";
    const values = [title, url, rating];
    const result = await pool.query(query, values);
    const newvideo = result.rows[0];
    res.status(201).send(newvideo);
  } catch (error) {
    console.log("error");
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const query = "UPDATE videos SET rating = $1 WHERE id = $2";
    const values = [rating, id];

    await pool.query(query, values);

    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update rating" });
  }
});

// GET /:id //
// app.get("/:id", (req, res) => {
//   const idToFind = Number(req.params.id);
//   const video = videos.find((vid) => vid.id === idToFind);

//   videos.includes(video) === false
//     ? res.status(404).json({
//         success: false,
//         error: `Video not found`,
//       })
//     : res.status(200).json({
//         success: true,
//         video,
//       });
// });

app.get("/:id", async (req, res) => {
  try {
    const idToFind = Number(req.params.id);
    const query = "SELECT * FROM videos WHERE id = $1";
    const result = await pool.query(query, [idToFind]);
    const video = result.rows[0];
    if (video) {
      res.status(200).json({ success: true, video });
    } else {
      res.status(404).json({ success: false, error: "Video not found" });
    }
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ success: false, error: "Failed to fetch video" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const idToDelete = Number(req.params.id);
    const query = "DELETE FROM videos WHERE id = $1";
    const result = await pool.query(query, [idToDelete]);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, error: "Video not found" });
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: `Video with ID: ${idToDelete} has been deleted`,
        });
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ success: false, error: "Failed to delete video" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
