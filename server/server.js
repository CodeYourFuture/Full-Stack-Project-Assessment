const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ansu:ansu@cluster0.xtib2ze.mongodb.net/Video-App?retryWrites=true&w=majority"
);

const videoSchema = new mongoose.Schema({
  title: String, 
  url: String,
  rating: Number
})

const videoModel = mongoose.model("Video", videoSchema)

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./video-data.js");

// GET "/"

app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", async (req, res) => {
  try {
    const video = new videoModel({
      title: req.body.title, 
      url: req.body.url,
      rating: req.body.rating
    })


    await video.save()
    res.json(video)
   
  } catch (error) {
    res.status(500).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/:id", (req, res) => {
  try {
    let video = {};

    videos = videos.filter((v) => {
      return v.id != req.params.id;
    });
    res.json(videos);
  } catch {
    res.status(500).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.get("/:id", (req, res) => {
  let foundVideo = videos.find((video) => {
    if (video.id == req.params.id) {
      return true;
    }
  });
  res.json(foundVideo);
});

app.post("/videos/:id/vote", (req, res) => {
  res.send();
});
