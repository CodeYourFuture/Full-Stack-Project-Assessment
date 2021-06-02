const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
let videos = require("../client/src/exampleresponse.json");
const cors = require("cors");

app.use(cors())

// needed for the post request
app.use(express.json())


// GET all videos
app.get("/", (req, res) => {
 res.json(videos)
});


//Get one video, specified by an ID
app.get("/:id", function(req, res){
  const id = parseInt(req.params.id);
  const filteredId = videos.find(video => video.id === id);

  if(filteredId){
    res.json(filteredId)
  } else {
   res.status(404).send({
  "result": "failure",
  "message": "Video could not be deleted"
});
  }
})


//Add a new video
app.post("/", function(req, res) {
  console.log(req.body);
  const newVideo = req.body;
  newVideo.id = Math.floor(Math.random() * 10000)
  
  if(newVideo.title && newVideo.url){
    videos.push(newVideo);
    res.send({"id": newVideo.id})
  } else {
    res.status(400).send({
  "result": "failure",
  "message": "Video could not be saved"
})
  }
})


//Delete a video, specified by an ID
app.delete("/:id", function(req, res){
   const id = parseInt(req.params.id);
   const videoIndex = videos
        .findIndex(video => video.id === id);
    if (videoIndex >= 0) {
        videos.splice(videoIndex, 1);
        res.sendStatus(200)
    } else {
      res.send({
  "result": "failure",
  "message": "Video could not be deleted"
})
    }
})



app.listen(port, () => console.log(`Listening on port ${port}`));