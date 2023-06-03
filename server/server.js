const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos);
});

app.post('/', (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ result: 'failure', message: 'Video could not be saved' });
  }

  const newVideo = {
    id: Date.now(),
    title,
    url,
    rating: 0,
  };

  videos.push(newVideo);
  res.json({ id: newVideo.id });
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const video = videos.find((v) => v.id === id);

  if (!video) {
    return res.status(404).json({ result: 'failure', message: 'Video not found' });
  }

  res.json(video);
});


app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = videos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ result: 'failure', message: 'Video not found' });
  }

  videos.splice(index, 1);
  res.json({});
});
