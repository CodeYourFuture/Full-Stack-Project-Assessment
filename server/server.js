const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());

let videos = require("../exampleresponse.json");
// Generate a unique ID for each new video
let nextVideoId = 1;

// GET "/"
app.get("/", (req, res) => {
  res.json({ express: 'Your Backend Service is Running' });
});


app.get("/:id", (req, res) =>{
  const id = req.params.id;
  const video = videos.find(video => id === video.id.toString());
  if(video){
    res.json(video);
  }else{
    res.status(404).json();
  }
})

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.find(video => id === video.id.toString());
  if(video){
  videos = videos.filter(video => id !== video.id.toString());
  res.json();
 }else{
  res.status(404).json({"result": "failure",
  "message": "Video could not be deleted"});
 }
 

})
//POST - Add a new video
app.post('/', (req, res) => {
  const{ title, url } = req.body;
  if(!title || !url) {
    return res.status(400).json({ result: 'failure', message: 'Title and URL must be provided'})
  }
 // Create a new video object
 const newVideo = {
  id: nextVideoId++,
  title,
  url,
  rating: 0,
  uploadedAt: new Date().toISOString()
 };
 // Add the video to the videos array
 videos.push(newVideo);
 res.status(201).json({ id: newVideo.id });
}); 
