const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");


app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos)
});

//POST
app.post("/", (req, res) => {
  const videoId = Math.floor(Math.random() * 10000);

  const newVideo = {
    id: videoId,
    title: req.body.title,
    url: req.body.url
  };
  if (videos.find(video => {
    if (video.title === newVideo.title || video.url === newVideo.url) {
      return true;
    }
  })) 
  {
    res.status(409).send({msg: "Video title or video already exist!"})
  }
  else if (newVideo.title && newVideo.url.includes("https://www.youtube.com/watch?v=")) {
    videos.push(newVideo);
    res.status(201).json({
      msg: "Video added successfully!",
      id: newVideo.id
    })
  } else {
    res.status(400).json({
      result: "Failure",
      msg: "Video title blank or url incorrect!"
    })
  }
});

//GET "/{id}"

app.get("/:id", (req, res) => {
  const videoId = +req.params.id;
  if (videos.some(video => video.id === videoId)) {
    const targetVideo = videos.find(video => video.id === videoId);
    res.status(200).json({targetVideo});
  } else {
    res.status(400).json({msg: "Video with this id NOT found!"})
  }
})

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;
  if (videos.some(video => video.id === videoId)) {
    const indexOfVideo = videos.findIndex((video => video.id = videoId));
    videos.splice(indexOfVideo, 1);
    res.status(200).json({msg: "Video removed successfully!"});
  } else {
    res.status(400).json({
      result: "Failure",
      message: "Video could not be deleted!"
    })
  }
})