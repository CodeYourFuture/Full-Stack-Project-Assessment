const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
app.use(cors())
app.use(express.json())

const videos = require ("./data.json")
console.log(videos);


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});
/*************** */
app.post("/", (req, res) => {
  const newVideo = {
    id: 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0
  };

  console.log(newVideo)

  if (!newVideo.title || !newVideo.url) {
    res.status(404).json({message: "Fill in all fields"})
  } else {
    videos.push(newVideo);
    res.status(200).json({message: "New video added", videos})
  }
});
/******************* */
app.get("/:id", (req, res) => {
  const newId = Number(req.params.id);
  const foundVideo = videos.find(el => el.id === newId);
  console.log(foundVideo);
  res.status(200).json(foundVideo);

});

app.delete("/:id", (req, res) => {
  const newId = Number(req.params.id);
  const foundVideo = videos.findIndex(el => el.id === newId);
  const videoToDelete = videos.find(el => el.id === newId)
  console.log(videoToDelete);
  videos.splice(videoToDelete,1);
  res.status(200).json(videos);

});


app.listen(port, () => console.log(`Listening on port ${port}`));
