const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json")
app.use(express.json());

// GET "/"
    app.get("/", (req, res) => {
        res.json(videos);
    });
    
    // POST "/"
    app.post("/", (req, res) => {
        const { title, url } = req.body;
        if (!title || !url) {
            return res.status(400).json({ error: "Both title and url are required" });
        }
        
        const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
        if (!youtubeUrlPattern.test(url)) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }
        
        const id = Date.now();
        const currentDate = new Date();
        const newVideo = {
            id,
        title,
        url,
        rating: 0,
        uploadedAt: currentDate.toLocaleString() // Store the upload timestamp
    };
    videos.push(newVideo);
    res.status(201).json(newVideo);
});


app.get("/:id", (req, res) => {
  const { id } = req.params;

  const video = videos.find((v) => v.id === Number(id));

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  res.json(video);
});  

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    const index = videos.findIndex((v) => v.id === Number(id));
  
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