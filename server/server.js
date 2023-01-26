const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const port = process.env.PORT || 5000;
 

app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.use(bodyParser.json());

const videos = require("./exampleresponse.json");
const videoId = Date.now();
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with


// GET "/"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos );
});

app.get("/videos/search", (req, res) => {
  const searchVideo = req.query.term;
  const searchResult = videos.filter((video)=>
  video.title.toLowerCase().includes(searchVideo.toLowerCase()));
  if(!searchResult.length){
    res.status(404).json({msg: "not found"});
    return;
  }
  res.send(searchResult);
});

function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}
//post//

app.post("/videos", (req, res) => {
  if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
    res.status(400).json({ msg: "Please make sure to include  title and valid url" });
    return;
  }

  const newVideos = {
    id: videoId,
    timeAdded: new Date().toLocaleDateString(),
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  };
  videos.push(newVideos);
  res.json(videos);
});

app.get("/videos/:id", (req, res) => {
  let foundVideo = videos.find((video) => video.id == req.params.id);
  res.send(foundVideo);
});

// DELETE //
app.delete("/videos/:id", (req, res) => {
  const deleteVideoId = parseInt(req.params.id);
  const foundVideoIndex = videos.findIndex(
    (video) => video.id === deleteVideoId
  );
  if (foundVideoIndex < 0) {
    res.sendStatus(404);
    return;
  }
  videos.splice(foundVideoIndex, 1);
  res.send(`video with the id ${deleteVideoId} Has been deleted`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));