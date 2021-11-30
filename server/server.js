const { response, request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

app.use(cors());

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);

const videos = require("./exampleData.json");

// GET all data "/"
app.get("/", (request, response) => {
  const order = request.query.order;
  //order the data according to the votes
  order && order.toLowerCase() === "asc"
    ? videos.sort((a, b) => a.rating - b.rating)
    : videos.sort((a, b) => b.rating - a.rating);
  response.send(videos);
});

//GET video by id
app.get("/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const videoWithId = videos.find(
    (video) => video.id === videoId
  );
  videoWithId
    ? response.send(videoWithId)
    : response.status(404).send({
        msg: `Video with id: ${videoId} does not exist !!!`,
      });
});

// Create a new video
let temporaryID = 10; //DB WILL CREATE
app.post("/", (request, response) => {
  const title = request.body.title;
  const url = request.body.url;
  if (
    !title ||
    !url ||
    !url.includes("youtube") ||
    !url.includes("watch?v=")
  ) {
    return response.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  temporaryID++; //DB
  const newVideo = {
    id: temporaryID, //DB
    title: title,
    url: url,
    date: request.body.date,
    time: request.body.time,
    rating: 0,
  };
  videos.push(newVideo);
  response.send({ id: newVideo.id });
});

// Delete video specified by an ID
app.delete("/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const videoIndex = videos.findIndex(
    (video) => video.id === videoId
  );
  if (videoIndex === -1) {
    return response.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  videos.splice(videoIndex, 1);
  response.status(204).send({});
});
//UPDATE votes
app.put("/vote/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const vote = request.body.vote;
  const videoIndex = videos.findIndex(
    (video) => video.id === videoId
  );
  if (videoIndex === -1) {
    return response.status(404).send({
      result: "failure",
      message: "Video could not be found",
    });
  }
  videos[videoIndex].rating += vote;
  response.send({ rating: videos[videoIndex].rating });
});
