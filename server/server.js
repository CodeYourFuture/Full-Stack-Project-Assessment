const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");
require('dotenv').config()
const mockData = require("./exampleresponse.json");

const app = express();
app.use(express.json());
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...mockData];

// GET "/" , returns all videos 
app.get("/", (req, res) => {
  res.send(videos);
});

// returns a single video
app.get('/:id', (req, res) => {
  let { id } = req.params;
  if (!isNaN(id)) {
    id = Number(id)
  }

  const video = videos.find(video => video.id === id);
  if (video) {
    res.send(video)
  } else {
    res.send({
      "result": "failure",
      "message": "Video does not exist"
    })
  }
})

// adds a video 
app.post('/', (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.send({
      "result": "failure",
      "message": "Video could not be saved"
    })
  }

  const data = {
    id: v4(),
    rating: 0,
    title,
    url
  }
  videos.push(data);
  res.send({
    id: data.id
  })
})

// like and dislike 
app.put("/:id", (req, res) => {
  const { type } = req.body
  let { id } = req.params

  if (!isNaN(id)) {
    id = Number(id)
  }

  videos = videos.map(video => {
    if (video.id === id) {
      video.rating += (type == "like") ? 1 : -1
    }
    return video
  })
  res.send({
    result: "successful",
    message: "rating successfully updated"
  })

})

// delete a video
app.delete('/:id', (req, res) => {
  let { id } = req.params;
  if (!isNaN(id)) {
    id = Number(id)
  }

  const remainingVideos = videos.filter(video => video.id !== id);

  if (remainingVideos.length < videos.length) {
    videos = remainingVideos;
    res.send({})
  } else {
    res.send({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  }
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));