const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");
app.use(express.json()); 
const cors = require("cors"); 

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json()); 

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const { rows } = await db.query(query);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ result: "failure", message: "Failed to fetch videos" });
  }
});



app.post("/", async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  try {
    
    const queryText = 'INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *';
    const values = [title, url];

    const result = await db.query(queryText, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post("/", (req, res) => {
  const { title, url } = req.body;

 
  if (!title || !url) {
    return res.status(400).json({ result: "failure", message: "Title and URL are required" });
  }

  const newVideo = {
    id: generateUniqueId(),
    title,
    url,
    rating: 0, 
  };

  videos.push(newVideo);

  res.status(201).json({ id: newVideo.id });
});

app.get("/:id", (req, res) => {
  const videoId = req.params.id;
  const video = videos.find((v) => v.id === videoId);

  if (!video) {
    return res.status(404).json({ result: "failure", message: "Video not found" });
  }

  res.json(video);
});

app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const index = videos.findIndex((v) => v.id === videoId);

  if (index === -1) {
    return res.status(404).json({ result: "failure", message: "Video not found" });
  }

  videos.splice(index, 1);

  res.json({});
});

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
