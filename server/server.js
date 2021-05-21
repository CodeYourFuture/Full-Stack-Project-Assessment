const express = require('express');
const exampleresponse = require('./exampleresponse.json');
//const cors = require('cors');
const server = express();
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

server.use(express.json());
//server.use(cors({ origin: 'http://localhost:5000'}));

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.header(
    'Access-Control-Allow-Headers',
    // 'Access-Control-Allow-Methods',
    // 'Access-Control-Allow-Origin',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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

server.get('/', (req, res) => {
  let copyVideos = [...videos];
  let copyVideos2 = [...videos];
  if (!req.query.order) res.json(videos);
  else if (req.query.order === 'asc') {
    const ascendingOrder = copyVideos.sort(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
    );
    return res.json(ascendingOrder);
  } else if (req.query.order === 'desc') {
    const descendingOrder = copyVideos2.sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
    return res.json(descendingOrder);
  }
});

server.post('/', (req, res) => {
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
  if (title !== '' && match) {
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
    console.log(videos)
    return res.status(201).json({
      Result: 'Success!',
      Message: `Your video with a new id: ${Date.now()} is saved!`,
    });
  } else if (title === '') {
    return res.json({
      Result: 'failure',
      message: 'Title should not be empty!',
    });
  } else if (url === '' || !match) {
    return res.json({ Result: 'failure', message: 'Invalid url!' });
  }
});

server.get('/:id', (req, res) => {
  const id = req.params.id;
  const videoById = videos.find((video) => video.id.toString() === id);
  if (videoById) res.json(videoById);
  else
    res.status(404).json({ message: `Video by id: ${id} could not be found!` });
});

server.delete('/:id', (req, res) => {
  const id = req.params.id;
  const existingId = videos.find(video => video.id === id);
  const remainingVideos = videos.filter((video) => video.id.toString() !== id);
  if (videos.length - remainingVideos.length === 1) {
    videos = remainingVideos;
    res.json({ Server: `A video by the id: ${id} is successfully deleted!` });
  } else if (!existingId)
    res
      .status(404)
      .json({ Server: `A video by the id: ${id} could not be found!` });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
