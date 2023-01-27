const { json } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT ||3400;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let allVideos = require("../client/src/exampleresponse.json");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// GET "/"
app.get("/", (req, res) => {

  res.send(allVideos);
});
//Add a Video to API
app.post("/",(req,res) => {
  let newVideo = req.body;
  newVideo.id = Math.floor(Math.random()*100000);
  if(!newVideo.title || !newVideo.url){
    res. status (400).send({msg:"Please add a Title & Url from videos !"});
  }else{
  allVideos.push(newVideo);
  res.status(200).send({msg: `Video:${newVideo.title} has been added.`});
  }
});

//Search video 
app.get("/search",(req, res) => {
  const searchTerm = req.query.term;

  const filteredVideos = allVideos.filter((video) => {
video.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  })
  if(filteredVideos.length === 0){
    res.status(400)
    .json({msg: `No videos found related to term ${searchTerm}`});
  }
  
return res.json(filteredVideos);
});

//Search a Video with Id
app.get("/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  const filteredVideo = allVideos.find((video) => video.id === Id);

  if(filteredVideo.length === 0){
    res.status(400).send(({msg: `Video with Id:${Id} not found!`}));
  }else{
    res.status(200).send(filteredVideo);
  }
});
// Delete a Video with Id 
app.delete("/:id",(req, res) =>{
  const Id = parseInt(req.params.id);
  const videoIndex = allVideos.findIndex((video) => video.id === Id);
  if(videoIndex >= 0){
    allVideos.splice(videoIndex, 1);
    res.status(200).send({msg:`Video wit id:${Id} has been deleted.`});

  }else{
    res.status(400).send({msg:`Video wit id:${Id} not found.`});
  }
});