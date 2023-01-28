const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const videos = require("./exampleresponse.json"); 
const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};
app.use(express.json());
app.use(cors({origin: "* "})); 

app.listen(port, () => console.log(`Listening on port ${port}`));
``

const maxId = Math.max(...videos.map((video) => video.id)); 

app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({message: "Welcome to the backend of the video recommendation APP"});
});

app.get("/videos", (req, res) => {
  res.json(videos);
});

app.post("/videos", (req, res) => {
  let title = req.body.title;
  let url = req.body.url; 
  const newVideo = {
    id: maxId + 1, 
    title: req.body.title, 
    url: req.body.url, 
    rating: req.body.rating 
  };
  if(!req.body.title || !req.body.url){
    return res.status(400).json({error: "error", message:"Please enter a title and a url"}); 
  }else if (!isValidYoutubeUrl(newVideo.url)){
    return res.status(400).json({error: "error", message: "NOT a valid youtube url"}); 
  }
  videos.push(newVideo);
  res.status(200).json(videos); 
})

app.get("/video/:id", (req, res) => {
  const videoId = parseInt(req.params.id); 
  let filteredVideo = videos.filter((video) => video.id === videoId);
  res.json(filteredVideo);
})

app.delete("/video/:id", (req, res) => {
   const videoId = parseInt(req.params.id);
  //  let video = videos.filter((video) => video.id !== videoId);
  let videoIndex = videos.findIndex((video) => video.id === videoId);
  videos.splice(videoIndex, 1);
  console.log(videos.length);
   res.json({id: videoId, message: 'Video deleted'});
}); 

