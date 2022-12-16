const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./../client/src/exampleresponse.json");

//get all example videos
// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
  //res.send({ express: "Your Backend Service is Running" });
});

// //POST "/"
// This endpoint is used to add a video to the API.
// Both fields - title and url - must be included and be valid for this to succeed.
// Note: When a video is added, you must attach a unique ID to so that it can later be deleted

app.post("/", function (req, res) {
  console.log("POST / route - video");
  let newVideo = req.body;
  console.log(newVideo, videos.length);
  //checking for an empty object but no need if checking if either fields empty
  //if (!Object.keys(newChat).length)
  if (!(req.body.title || req.body.url)) {
    res.status(400).send("All fields are required to be entered");
  } else {
    videos.push(newVideo);
    res.status(200).json(videos);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
