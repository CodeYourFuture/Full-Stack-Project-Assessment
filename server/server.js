const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require('uuid');
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = require("../client/src/component/data/soulsongs.json");

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

//GET for specific ID

app.get("/:id", (req, res) => {
  const videoId = req.params.id;
  const chosenVideo = videos.filter((video) => video.id === parseInt(videoId));
  if (chosenVideo.length > 0) {
    res.send(chosenVideo[0]);
  } else {
    res.status(404).send({ message: "Video not found" });
  }
});

//POST

app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;

  if (!title || !url) {
    return res
      .status(404)
      .send({
        result: "Failed",
        message: "Video could not be saved. Provide both video title and URL",
      });
  }

  // const videosUpdate = [...videos];
  //add the new video to the updated video collection with unique id
  videos.push({
    id: uuidv4(),
    title,
    url,
  });

  return res.status(200).send({
    result: "Success",
    message: "Video added successfully",
    title: title,
    id: videos[videos.length-1].id
  });


});

//DELETE
app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const positionVideo = videos.findIndex((video) => video.id === parseInt(videoId));
  if (positionVideo === -1) {
    res.status(400).send({
      result: "Failed",
      message: "Video could not be deleted",
    });
  } else {
    videos.splice(positionVideo, 1);
    res.status(200).send({ 
        result: "Video deleted",
        message: `Video with ID ${videoId} deleted`
     });
  }
});
