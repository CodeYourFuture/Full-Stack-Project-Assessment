const express = require("express");
const fs = require("fs"); // Node.js built-in module for file operations
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors"); // Import the cors package

//bodypas
// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

let videos; // Declare the variable first

try {
  const jsonData = fs.readFileSync('../exampleresponse.json', 'utf-8');
  videos = JSON.parse(jsonData);
} catch (error) {
  console.error('Error loading exampleresponse.json:', error.message);
}

// GET "/"
// Modify your GET "/" endpoint
app.get("/", (req, res) => {
  const { order } = req.query;
  
  // Sort videos based on the "order" parameter
  if (order === "asc") {
    videos.sort((a, b) => a.rating - b.rating);
  } else {
    // Default to descending order (highest votes first)
    videos.sort((a, b) => b.rating - a.rating);
  }

  res.send(videos);
});


// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  const id = Date.now();
  videos.push({ id, title, url });
  res.status(201).json({ id });
});

// GET "/:id"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  res.json(video);
});

// DELETE "/:id"
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((video) => video.id === id);

  if (index === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  videos.splice(index, 1);
  res.json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
