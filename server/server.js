const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 


let videos = [];


function generateVideoId() {
  return Math.floor(Math.random() * 1000000000000); 
}

// GET 
app.get("/", (req, res) => {
  res.json(videos);
});

// POST 
app.post("/", (req, res) => {
  const { title, url } = req.body;

 
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and URL must be provided",
    });
  }


  const id = generateVideoId();

 
  const newVideo = {
    id,
    title,
    url,
    rating: 0, 
  };
  videos.push(newVideo);
  res.status(201).json({ id });
});

// GET "/:id"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

 
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  res.json(video);
});

// DELETE
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = videos.findIndex((v) => v.id === id);

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

