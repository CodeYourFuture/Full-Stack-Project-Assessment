const express = require("express");
let cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../client/src/exampleresponse.json");

let fail = {
  "result": "failure",
  "message": "Video could not be saved"
};


// GET "/"
app.get("/", (req, res) =>
{
  res.send(videos);
});

app.post("/", (req, res) =>
{
  /*console.log(req.body);
  console.log("This is id: " + req.body.id);*/
  const video = {
    id: req.body.id,
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
    added: req.body.added
  };


  if (typeof req.body.title !== "string" || typeof req.body.url !== "string")
  {
    //console.log(video);
    res.status(400).send(fail);
  }

  else
  {
    videos.push(video);
    res.status(200).json(videos);
  }
});

app.get("/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  let filteredVideo = videos.filter(video => video.id === id);

  res.send(filteredVideo);
});

app.delete("/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  let filterdVideo = videos.filter(video => video.id === id);

  if (filterdVideo.length !== 0)
  {
    videos = videos.filter(video => video.id !== id);
    res.send({});
  }

  else
  {
    res.send(fail);
  }
});