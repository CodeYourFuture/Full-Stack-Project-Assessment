const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const exampledata = require('../exampleresponse.json')


app.use(express.json()); 
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampledata;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos);
});

app.post("/", (req, res) => {
  const { title, url } = req.body;

  // Validate title and URL
  if (!title || !url) {
    return res.status(400).json({ result: "failure", message: "Title and URL are required." });
  }

  // Generate a unique ID for the new video
  const id = nextVideoId++;

  // Create a new video object
  const newVideo = {
    id,
    title,
    url,
  };

  // Add the new video to the list
  videos.push(newVideo);

  // Respond with the generated ID
  res.json({ id });
});



// get by id"
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  // Find the video by ID in the videos array
  const video = videos.find((v) => v.id === videoId);

  if (!video) {
    return res.status(404).json({ result: "failure", message: "Video not found." });
  }

  res.json(video);
});

// delete by id"
app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  // Find the index of the video to be deleted
  const index = videos.findIndex((v) => v.id === videoId);

  if (index === -1) {
    return res.status(404).json({ result: "failure", message: "Video not found." });
  }

  // Remove the video from the videos array
  videos.splice(index, 1);

  res.json({});
});



