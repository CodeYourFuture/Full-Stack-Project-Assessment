const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); 
const dataVideos = require("./example.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];
videos.push(dataVideos);
// console.log(videos);

// GET "/"
app.get("/", (req, res) => {
  res.send(videos).json;
});

// POST "/"
app.post('/', (req, res) => {
 let { title, url } = req.body;
 let newVideo = {
    id: videos.length,
    title: title,
    url: url,
  };

if(!newVideo.id || !newVideo.url){
  res.status(400).send({
    "result": "failure",
    "message": "Video could not be saved"
  });
}else {
  videos.push(newVideo);
     res.sendStatus(200);
     
}
})

//`GET` "/{id}"
app.get("/:id", (req, res) =>{
let id = parseInt(req.params.id);
console.log(id);
let findVideo = videos.find(ID => ID.id === id);
if(!findVideo){
  res.send("Baa").status(404)
}else{
  res.send(findVideo);
}
})

// `DELETE` "/{id}"
app.delete('/:id', (req, res)=> {
let id = parseInt(req.params.id);
let toDel = videos.find(opt => opt.id === id);
let notDel = videos.filter(opt => opt.id !== id);

if(toDel === undefined){
  res.send(400).send({
    "result": "failure",
    "message": "Video could not be deleted"
  })
}else {
  res.send({}).status(200);
}
videos = notDel;
})





