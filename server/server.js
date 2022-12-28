const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./../client/src/exampleresponse.json");

//get all example videos
// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
  //res.send({ express: "Your Backend Service is Running" });
});

//POST "/"
app.post("/", function (req, res) {
  console.log("POST / route - video");
  let newVideo = req.body;
  console.log(newVideo, videos.length);
  //checking for an empty object but no need if checking if either fields empty
  //if (!Object.keys(newChat).length)
  if (!(req.body.title || req.body.url)) {
    res.status(400).send("All fields are required to be entered");
  } else {
    newVideo.id = `${newVideo.url.slice(newVideo.url.indexOf("=") + 1)}`;
    videos.push(newVideo);
    console.log(newVideo, videos.length);
    res.status(200).json(videos);
  }
});

//GET "/{id}"
app.get("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let videoOfId = videos.filter((vid) => vid.id === id);
  res.status(200).send(videoOfId);
});

//DELETE "/{id}"

app.delete("/:id", function (req, res) {
  let id = req.params.id;
  let result = videos.filter((el) => el.id !== id);
  videos = result;
  if (result) {
    console.log(videos);
    res.send(result);
  } else {
    res.status(404).send("Incorrect ID, please enter again");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
