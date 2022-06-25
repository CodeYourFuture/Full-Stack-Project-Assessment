const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require('../client/src/exampleresponse.json');


// GET "/"
app.get("/", (req, res) => {
  res.json(videos)
});

app.get("/:id", (req, res) => {
  let id = parseInt(req.params.id)
  const videoById = videos.filter(video => video.id === id);
  if (videoById) {
    res.status(200).json(videoById);
  } else {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "id is not locatable - please enter valid id"
    })
  }
})

app.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id)
  const deleteById = videos.filter(video => video.id === id);
  if (deleteById) {
    res.status(200).json(videos.filter(video => video.id !== id));
  } else {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "id is not locatable - video could not be deleted"
    })
  }
})

let idsUsed = videos.map(video => video.id);

app.post('/', (req, res) => {
  let video = {
    "id": (Math.max(...idsUsed) + 1),
    "title": req.body.title,
    "url": req.body.url,
    "rating": 0
  }

  if ((req.body.title || req.body.url) === "") {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "Please provide valid title/url"
    })
  } else {
    console.log(video);
    videos.push(video);
    idsUsed.push(video.id);
    res.send(video)
  }
})


app.listen(port, () => console.log(`Listening on port ${port}`));
