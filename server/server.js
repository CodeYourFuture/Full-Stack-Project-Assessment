const express = require("express");
const cors = require("cors");
const videoData = require("../client/src/data/exampleresponse.json")
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 5000;



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
 res.send(videoData)
});

app.post("/", (req, res) => {
  const newVideo = req.body;

  if (!newVideo.title || !newVideo.url) {  
    res.status(404).send({
      result: "failure",
      message: "Video could not be saved",
    });
    return;
  }

    const newVcData = {
      id: videoData[videoData.length - 1].id + 1,
      title: newVideo.title,
      url: newVideo.url,
    };
    console.log(newVideo);

    if (newVideo) {
      videoData.push(newVcData);
      res.status(201).send({id:newVcData.id});
    } else {
      res.status(400).send("error");
    }
});

app.get("/:id", (req, res) => {
    const filteredVideo = videoData.filter((video)=>video.id === +req.params.id);
  res.send(filteredVideo);
});

app.delete("/:id", (req, res) => {
  const index = videoData.findIndex(
    (video) => video.id === +req.params.id
  );
  //console.log(index);
  videoData.splice(index, 1);

  res.send("delete was successful");
  console.log("DELETE /album route");
});

app.listen(port, () => console.log(`Listening on port ${port}`));