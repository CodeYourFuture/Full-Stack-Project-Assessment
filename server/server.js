const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

//POST "/"
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const newVideo = { id: 0,title: title, url: url, rating: 0 };

  if (newVideo.title && newVideo.url) {
    newVideo.id = videos.length+1;
    videos.push(newVideo);
  } else {
    res.status(400).json({ result: "failure", message: "Video could not be saved" });
  }
  res.status(200).json(videos);
});

//GET "/{id}"
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.find(v => v.id == id);
  
  if(!video){
    res.status(400).json(`There is no video with id ${id}`)
  }

  res.status(200).json(video)
})