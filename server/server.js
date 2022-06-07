const express = require("express");
const cors = require("cors")

const {readFileSync ,writeFileSync} = require('fs');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/videos", (req, res) => {
  const videos = JSON.parse(readFileSync("./data/exampleresponse.json", "utf8"))
  res.json(videos)
});

app.delete("/videos/:id", (req, res) => {
  const videos = JSON.parse(readFileSync("./data/exampleresponse.json", "utf8"))
  const id = Number(req.params.id)
  const found = videos.filter(video => video.id === id)
  console.log(found);
  if (found) {
    const newVideos = videos.filter(video => video.id !== id)
    res.sendStatus(201);
    writeFileSync("./data/exampleresponse.json", 
      JSON.stringify(newVideos, null, 2), "utf8")
  } else 
  {
    res.status(404).send('Video not found!')
  }
})
