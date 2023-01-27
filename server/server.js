const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const exampleResponse = require('../client/src/exampleresponse.json')

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json())

// app.use(express.static(path.resolve(__dirname, "../client/build")));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampleResponse;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get('/videos', (req, res) => {
  res.json(videos)
})

app.post('/videos', (req, res) => {
  // res.send(req.body.id)
  // res,json({result: 'failure', message: 'Video could not be saved'})
})

app.get('/videos/:id', (req, res) => {
  const id = Number(req.params.id)
  const videosCopy = videos
  const videoId = videos.find((video) => video.id === id)

  !videoId && res.status(404).send('Not Found')

  res.json(videosCopy.filter((video) => video.id === id))
})

app.delete('/videos/:id', (req, res) => {
  const id = Number(req.params.id)
  const videoId = videos.find((video) => video.id === id)
  const videoIndex = videos.findIndex((video) => video.id === id )

  !videoId && res.status(404).send('Not Found')

  videos.splice(videoIndex, 1)
  console.log()
  res.send(videos)
})