const express = require("express");
const videoData = require("../client/src/data/exampleresponse.json")
const app = express();
const port = process.env.PORT || 5000;



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
 res.send(videoData)
});

app.get("/:id", (req, res) => {
    const filteredVideo = videoData.filter((video)=>video.id === +req.params.id);
  res.send(filteredVideo);
});


app.listen(port, () => console.log(`Listening on port ${port}`));