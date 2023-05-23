const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [{
  "id": 523523,
  "title": "Never Gonna Give You Up",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "rating": 23
},
{
  "id": 523427,
  "title": "The Coding Train",
  "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
  "rating": 230
},
{
  "id": 82653,
  "title": "Mac & Cheese | Basics with Babish",
  "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
  "rating": 2111
},
{
  "id": 858566,
  "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
  "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
  "rating": 11
},
{
  "id": 453538,
  "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
  "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
  "rating": 3211
},
{
  "id": 283634,
  "title": "Learn Unity - Beginner's Game Development Course",
  "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
  "rating": 211
},
{
  "id": 562824,
  "title": "Cracking Enigma in 2021 - Computerphile",
  "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
  "rating": 111
}];

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
