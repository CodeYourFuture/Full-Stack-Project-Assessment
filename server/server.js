const express = require("express");
const app = express();
const port = 9000;
const videos = require("../exampleresponse.json");
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.get("/", (request, response) => {
  // Delete this line after you've confirmed your server is running
  response.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", function (request, response) {
  response.json(videos);
});

app.get("/videos/:id", function (request, response) {
  const singleVideo = videos.find((video) => video.id === +request.params.id);
  if (!singleVideo) return response.status(404).send("incorrect id");
  response.json(singleVideo);
});

app.post("/videos", function (request, response) {
  const newVideo = request.body;
  newVideo.id = new Date().getTime();
  if (!newVideo.title)
    return response.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  videos.push(newVideo);
  console.log(videos);
  response.json({
    id: newVideo.id,
  });
});

app.delete("/videos/:id", (request, response) => {
  const videoIndex = videos.findIndex(
    (video) => video.id === +request.params.id
  );
  if (videoIndex === -1)
    return response.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  videos.splice(videoIndex, 1);
  response.json({});
});
