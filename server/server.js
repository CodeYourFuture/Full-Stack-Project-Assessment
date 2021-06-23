const { response, request } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();
const videos = require("../exampleresponse.json");
const lodash = require("lodash");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = [];

// GET "/"
app.get("/", (req, res) => {
  res.json({ videos });
});

app.post("/", (request, response) => {
  const newVideo = {
    id: lodash.uniqueId(),
    title: request.body.title,
    url: request.body.url,
    rating: request.body.rating,
  };
  if (request.body.title.trim() && request.body.url.trim()) {
    videos.push(newVideo);
    const id = {
      id: newVideo.id,
    };
    response.status(201).json(id);
    response.end;
  }
  const error = {
    result: "failure",
    message: "Video could not be saved",
  };
  response.json(error);
});

app.get("/:videoId", (request, response) => {
  const videoId = request.params.videoId;
  const filteredVideo =videoId && videos.filter((video) => video.id == videoId);
  response.json(filteredVideo);
});

app.delete("/:videoId",(request,response)=>{
  const videoId = request.params.videoId;
  const deletedIndex= videos.findIndex((video) => video.id == videoId);
  const error = {
    result: "failure",
    message: "Video could not be deleted",
  };
  if(deletedIndex>-1){
  videos.splice(deletedIndex, 1);
  response.status(200).json({});
  }
  else response.json(error);
})