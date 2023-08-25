const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./videos.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  const newId = videos.length + 1;
  const video = {
    id: newId,
    title: req.body.title,
    url: req.body.url,
  };
  if (req.body.title && req.body.url) {
    videos.push(video);
    res.status(200).send(video);
  } else
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
});

app.get("/:id", (req,res) => {
const id = Number(req.params.id);
const filteredVideos = videos.filter((video) => video.id === id);
if (filteredVideos.length > 0) {
  res.json(filteredVideos);
}else{
  res
    .status(404)
    .json({ 
      result: "failure", 
      message: "Video could not be found" });
}
})
