const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors")
dotenv.config()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// const data = require("./exampleresponse.json")

// Read in from the json file
let data = JSON.parse(fs.readFileSync("./exampleresponse.json", "utf-8"));
let videos = data;
let maxID = Math.max(...videos.map(c => c.id));

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

app.get("/videos", (req, res) => {
  res.json(videos);
  
});


app.post("/", (req, res) => {
  if(!req.body.title || !req.body.url){
    res.status(400).send("Please enter a title and/or video URL");
    return
  }
  const newVideo = {
    "id": ++maxID,
    "title": req.body.title,
    "url": req.body.url,
    "rating": req.body.rating
  }
  videos.push(newVideo);
  // save()
  res.json(newVideo);
})

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id)
  const videoIndex = videos.findIndex(v => v.id === videoId)

  if(videoIndex < 0){
    res.sendStatus(404)
    return
  }
  res.json(videos.find(v => v.id === videoId))
})


app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id)
  const videoIndex = videos.findIndex(v => v.id === videoId)

  if(videoIndex < 0){
    res
      .status(404)
      .send({ result: "failure", message: "Video could not be deleted" });
    return
  }

  videos.splice(videoIndex, 1)

  res.send("Video deleted!")
})


const save = () => {
  fs.writeFileSync('./exampleresponse.json', JSON.stringify(data, null, 2));
}
app.listen(port, () => console.log(`Listening on port ${port}`));