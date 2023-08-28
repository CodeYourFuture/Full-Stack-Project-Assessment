require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const { v4: uuidv4 } = require("uuid");

const videos = require("./exampleresponse.json")

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.status(200).json(videos);
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url || !url.startsWith("https://www.youtube.com")) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const id = uuidv4().slice(0, 7);
    const newVideo = {
      id,
      title,
      url,
      rating: 0
    }
    videos.push(newVideo);
    res.status(201).json({id});
  }
});

app.get("/:id", (req, res) => {
  const id = Number(req.params.id); 
  const matchingVideo = videos.find((video) => { 
    return (video.id === id);
  })
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.")
  } else {
    res.status(200).json({ matchingVideo });
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
