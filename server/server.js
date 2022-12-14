const express = require("express");
const app = express();
app.use(express.json());
const videos = require("./exampleresponse.json");
const cors = require("cors");//allowing other domains to make requests against your web API
app.use(cors());
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

// POST "/" (add a video to the API)
app.post('/', (req, res) => {
  const { title, url, rating } = req.body;
  const newVideo = {
    id: videos.length,
    title,
    url,
    rating,
  };
  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json("Please include a title and url");
  }
  videos.push(newVideo);
  res.send(videos)

});

// GET "/{id}" (returns the video with the ID contained within the `{id}` parameter
app.get('/:ID', (req, res) => {
  const { ID } = req.params;
  const videoWithReqId = videos.find(elem => elem.id == ID)
  res.send(videoWithReqId);
});

// DELETE "/{id}" (Deletes the video with the ID container within the `{id}` parameter)
app.delete('/:ID', (req, res) => {
  const ID = req.params.ID;
  const notDeletedVideos = videos.filter(elem => elem.id != ID);
  res.send(notDeletedVideos);
});

