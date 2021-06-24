const express = require("express");
const cors = require("cors");
//const {v4 : uuidv4} = require('uuid')
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
let videos = require("./data/exampleresponse.json");
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = [];
app.use(cors());
app.use(express.json());
// GET "/"
// GET "/" This endpoint is used to return all of the videos.
app.get("/", (req, res) => {
  res.send({videos});
});


app.post("/", (req, res) => {
  const newVideo = req.body;
  newVideo.id = Math.random().toString(26).slice(2);
//  const userId = uuidv4();
//  newVideo.id =  userId;

  newVideo.rating = 0;
  const validateUrl = ((url) => {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
        } return false;
  })
  const errorMessage = {
    "result": "failure",
    "message": "Video could not be saved"
  };




  if(!newVideo.title || !validateUrl(newVideo.url)){
    res.status(400).send(errorMessage);
  }  else {
    videos.push(newVideo);    
    res.status(201).send(videos); 
  };  
        
});

// GET "/{id}" Returns the video with the ID contained within the {id} parameter
app.get("/:id", (req, res) => {
  const videoId= parseInt(req.params.id);
  const requestedVideo = videos.find(video => video.id === videoId);
  if(!requestedVideo){
    res.status(404).send(`Video with the Id: ${videoId} not found`)
  } 
    res.status(201).send(requestedVideo);
});

// DELETE "/{id}" Deletes the video with the ID container within the {id} parameter
app.delete("/delete/:id", (req, res) => {
  const videoId= parseInt(req.params.id);
  const errorMessage = {
    "result": "failure",
    "message": "Video could not be deleted"
  };
  //const deletedVideo = videos.filter(item => item.id !== videoId);
  const deletedVideo = videos.findIndex(video => video.id === videoId);
  if(deletedVideo >= 0 ) {
    videos.splice(deletedVideo, 1);
    res.status(200).send(`Video with the id: ${videoId} has been deleted`);
  } 
    res.status(404).send(errorMessage);
});