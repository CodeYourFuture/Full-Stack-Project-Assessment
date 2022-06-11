const { response } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  // res.send({ express: "Your Backend Service is Running" });

  res.send(videos);
});

app.post("/videos", function (req, res) {
  let newId = videos[videos.length - 1].id + 1;
  const newVideo = {
    id: newId,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  videos.push(newVideo);

  res.send(videos);
});

app.get("/videos/:Id", function (request, response) {
  const index = videos.findIndex((video) => video.id == request.params.Id);
  response.json(videos[index]);
});

app.delete("/videos/:Id", function (request, response) {
  const index = videos.findIndex((video) => video.id == request.params.Id);
  videos.splice(index, 1);
  response.send(`Message at index ${index} was deleted`);
});
