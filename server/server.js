const express = require("express");
const fs = require("fs");
const app = express();
const videosData = JSON.parse(fs.readFileSync('./exampleresponse.json'));
const port = process.env.PORT || 5000;

app.use(express.json());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosData;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get('/videos/data', (req, res) => {
  res.send(videos);
})

app.get('/videos/data/:id', (req, res) => {
  const videoID = Number(req.params.id)
  const getVideoByID = videos.find((video) => video.id === videoID)
  res.status(200).send(getVideoByID);
})




app.listen(port, () => console.log(`Listening on port ${port}`));
