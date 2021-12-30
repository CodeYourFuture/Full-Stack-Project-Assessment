const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //allows me to use raw
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");
const { request, response } = require("express");

// GET "/"
app.get("/", (requset, response) => {
  // Delete this line after you've confirmed your server is running
  // res.send({ express: "Your Backend Service is Running" });
    response.send(videos);
});

app.get("/id/:id",(request,response) => {
  const video = videos.find((video)=>String(video.id)===request.params.id);
  response.send(video);
})

app.post("/", (request,response) => {
    if(request.body.title === "" || request.body.url === ""){
      response.status(400).send({
        result: "failure",
        message: "Video could not be saved"
      });
    }else{
    let newVideo = request.body;
    const newId = 1 + Math.max(...videos.map(video => Number(video.id)));
    Object.assign(newVideo, { id: newId });  
    videos.push(newVideo);
    response.status(200).send({id: newVideo.id});
    }
}
);

app.delete("/:id", (request,response) => {
  const videoIndex = videos.findIndex(
    (video) => String(video.id) === request.params.id
  );
  if (videoIndex > 0) {
    videos.splice(videoIndex, 1);
    response.sendStatus(204);
  } else {
    response.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.listen(port, () => console.log(`Your Backend Service is Running ${port}`));
