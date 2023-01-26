const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const dataVideos = require("./example.json")

app.listen(port, () => console.log(`Listening on port ${port}`));


let videos = [];
videos.push(dataVideos);
// GET "/"
app.get("/", (req, res) => {
  
  res.send(videos).json;
});

//POST "/"
app.post('/', (req, res) => {
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
