const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

let videos = [];

app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    res.status(400).json({ message: "Title and URL are required" });
    return;
  }

  const newVideo = {
    id: videos.length + 1,
    title: title,
    url: url,
    votes: 0,
  };

  videos.push(newVideo);
  res.status(201).json({ id: newVideo.id });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
