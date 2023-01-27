const express = require("express");
const fs = require("fs")
const app = express();
app.use(express.json());

let videos = JSON.parse(fs.readFileSync('videos.json', 'utf-8'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  res.send(videos)

});

// post
app.post('/', (req,res) => {
  let maxID = Math.max(...videos.map(c => c.id));
  const newVideo = Object.assign({ id: ++maxID}, req.body);

  if(!req.body.url || !req.body.title ){
    res.status(400).send("All fields are required to be entered");
    return
  } else{
    videos.push(newVideo);
  fs.writeFile(`${__dirname}/server/videos.json`, JSON.stringify(videos), err => {
    res.status(201).json({
        status: 'success',
        data: {
            video: newVideo
        }
    });
});
   }

})

// find by id

app.get(`/:id`, (req, res) => {
  const reqId = parseInt(req.params.id);

  const filteredVideos = videos.find((video) => video.id === reqId);

  if (filteredVideos.length === 0) {
    res.status(400).send({ msg: `Sorry here are no videos with the ID of ${reqId}` });
  } else {
    res.status(200).send(filteredVideos);
  }
})

app.delete('/:id' , (req, res) => {
  const delId = parseInt(req.params.id)
  
  const findIndex = videos.findIndex((video) => video.id === delId);

  if (findIndex >=0){
    videos.splice(findIndex, 1);
    res.status(200).send({msg: 'deleted'})
  } else{
    res.status(400).send({ msg: `Sorry here are no videos with the ID of ${delId}` });
  }
})
