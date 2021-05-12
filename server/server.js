const express = require('express');
const app = express();
const exampleresponse = require('../exampleresponse');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];
videos.push(exampleresponse);
function* flatten(array, depth) {
  if (depth === undefined) {
    depth = 1;
  }
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      yield* flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}

videos = [...flatten(videos, Infinity)];

// GET "/"
app.get('/', (req, res) => {
  res.json(videos);
});

app.post('/', (req, res) => {
  let newVideo = [];
  let title;
  let url;
  newVideo.push(req.body);
  newVideo.map((video) => {
    url = video.url;
    title = video.title;
  });
  const regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const match = url.match(regExp);
  if (title === '') {
    res.json({ Result: 'failure', message: 'Title should not be empty!' });
  } else if (url === '' || !match) {
    res.json({ Result: 'failure', message: 'Invalid url!' });
  } else
    videos = [
      ...videos,
      {
        id: Date.now(),
        title: title,
        url: url,
        rating: '',
        posted: new Date().toString(),
      },
    ];
  res.status(201).json({
    Result: 'Success!',
    Message: `Your video with a new id: ${Date.now()} is saved!`,
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const videoById = videos.find((video) => video.id.toString() === id);
  if (videoById) res.json(videoById);
  else res.status(404).json({ message: `Video by id: ${id} could not be found!` });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const remainingVideos = videos.filter((video) => video.id.toString() !== id);
  if (videos.length - remainingVideos.length === 1) {
    videos = remainingVideos;
    res.json({ Server: `A video by the id: ${id} is successfully deleted!` });
  } else res.status(404)
      .json({ Server: `A video by the id: ${id} could not be found!` });
});
