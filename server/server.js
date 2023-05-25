const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// Store and retrieve videos
let videos = [];

fs.readFile("./exampleresponse.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading example response file:", err);
  } else {
    try {
      videos = JSON.parse(data);
      // console.log("Example response loaded:", videos);
    } catch (parseError) {
      console.error("Error parsing example response:", parseError);
    }
  }
});

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;
  const rating = 0;

  if (title && url) {
    const id = Math.floor(Math.random() * 1000000);
    const video = { id, title, url, rating, date: new Date() };
    videos.push(video);
    res.json({ id });
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
});

// DELETE "/:id"
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = videos.findIndex((video) => video.id === id);

  if (index !== -1) {
    videos.splice(index, 1);
    res.status(204).json({ result: "success" });
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});

app.listen(port, () => console.log(`Listening on port {port}`));
