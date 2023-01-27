const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const dataVideos = require("./example.json")

app.listen(port, () => console.log(`Listening on port ${port}`));


let videos = [];
videos.push(dataVideos);
// GET "/"
app.get("/videos", (req, res) => {
  
  res.send(videos).json;
});

//POST "/"
app.post('/videos', (req, res) => {
  let {title, url } = req.body;
  let newVideos = {
    id: videos.length,
    title: title,
    url: url
  };

  if(!newVideos.id || !newVideos.url){
    res.status(400).send({
      "result": "fail",
      "message": "Video can not saved"
    });
  }else {
    videos.push(newVideos);
    res.sendStatus(200);
  }
})

//`GET` "/videos/:id"
app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);
  let findVideo = videos.find((video) => video.id === id);
  if(!findVideo) {
   // res.send("Not Found").status(404)
   res.status(404).send(`no video with the ${id} is found`)
   return
  } 
  //else {
    res.send(findVideo);
//}
})
app.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let toDel = videos.find(opt => opt.id === id);
  let notDel = videos.filter(opt => opt.id !== id);

  if(toDel === undefined) {
    res.send(400).send({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  } else {
    res.send({}).status(200);
  }
  videos = notDel;
})
