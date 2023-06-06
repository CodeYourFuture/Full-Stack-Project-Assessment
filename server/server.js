const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.db_url,
  ssl: { rejectUnauthorized: false },
});

const port = process.env.PORT || 5005;
app.use(express.json());
app.use(cors());

// db.connect();
// GET "/"
// app.get("/", (req, res) => {
//   res.send("Welcome to Island Tony");
// });

//get request for all videos
app.get("/", async (req, res) => {
  try {
    const order = req.query.order || "asc";
    const query = "SELECT * FROM videos ORDER BY rating ${order}";
    const result = await pool.query(query);
    const sortedVideos = result.rows;
    console.log(result.rows)
    res.json(sortedVideos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/videos/:id", (req, res) => {
  const videosId = parseInt(req.params.id);
  const eachVideo = "SELECT * FROM videos WHERE id=$1";
  db.query(eachVideo, [videosId]).then((result) => {
    if (result.rowCount === 0) {
      res.status(400).json({ message: `Video ${videosId} not found` });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.delete("/videos/:id", function (request, res) {
  const videosId = parseInt(request.params.id);
  const eachVideo = "DELETE FROM videos WHERE id = $1";
  db.query(eachVideo, [videosId])
    .then(() => res.status(200).json({ message: `Video ${videosId} deleted` }))
    .catch((error) => console.log(error));
});

app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    const postQuery =
      "INSERT INTO videos(title,url,rating,date) VALUES ($1,$2,$3,$4)";
    const postDate = new Date().toLocaleString();
    const result = await db.query(postQuery, [title, url, 0, postDate]);
    res.status(200).json({ message: "New Video added" });
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
