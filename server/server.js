const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3005", // Update with your React app's URL
};

app.use(cors(corsOptions));

let videos;

try {
  const jsonData = fs.readFileSync('../exampleresponse.json', 'utf-8');
  videos = JSON.parse(jsonData);
} catch (error) {
  console.error('Error loading exampleresponse.json:', error.message);
}

app.get("/", (req, res) => {
  res.json(videos);
});

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