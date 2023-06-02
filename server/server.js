const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9999;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.send({videos})
});


app.post("/", function (request, response) {
  let newVideo = {
    id: Math.floor(Math.random() * 1000000),
    title: request.body.title,
    url: request.body.url,
    rating: 0
  };
  if (
    !newVideo.title ||
    !newVideo.url 
  ) {
    response.status(404).send({
      result: "failure",
      message: "fill in this information",
    });
  } else {
     videos.push(newVideo);
    response.status(201).send({ videos });
  }
});


app.get("/:id", function (request, response) {
  const videoId = request.params.id;
  const findId = videos.find((video) => video.id === Number(videoId));
  if (findId) {
    response.send(findId);
  } else {
    response.status(404).send("message not found");
  }
});

app.delete("/:id", function (request, response) {
  const videoId = request.params.id;
  const findIndex = videos.findIndex(
    (video) => video.id === Number(videoId)
  );
  if (findIndex !== -1) {
    videos.splice(findIndex, 1);
    response.status(204).send({
      message: "video deleted successfully"
    });
  } else {
    response.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});