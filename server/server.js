const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos);
});

// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;
  
  // Check if title and url are valid
  if (!title || !url) {
    res.status(400).json({ result: "failure", message: "Video could not be saved" });
  } else {
    const id = Date.now(); 
    const video = { id, title, url, rating: 0 }; 
    videos.push(video); 
    res.json({ id }); 
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  // Find the video with the matching ID
  const video = videos.find((v) => v.id === id);
  
  if (video) {
    res.json(video); 
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  const index = videos.findIndex((v) => v.id === id);
  
  if (index !== -1) {
    videos.splice(index, 1); 
    res.json({}); 
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});