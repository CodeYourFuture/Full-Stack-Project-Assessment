const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");

// const {Client} = require("pg");
// const pgDb = new Client({
//   user: 'ansuj9123',
//   password: 'Bless123',
//   host: 'localhost',
//   database: 'video_app',
//   port: 5432
 
// });

// pgDb.connect(function(err){
//   if(err) throw err;
// });

// pgDb.query ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (523523,"Never Gonna Give You Up","https://www.youtube.com/watch?v=dQw4w9WgXcQ",23');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (523427,"The Coding Train","https://www.youtube.com/watch?v=HerCR8bw_GE",230');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (82653,"Mac & Cheese | Basics with Babish","https://www.youtube.com/watch?v=FUeyrEN14Rk",2111');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (858566,"Videos for Cats to Watch - 8 Hour Bird Bonanza","https://www.youtube.com/watch?v=xbs7FT7dXYc",11');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (453538, "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games", "https://www.youtube.com/watch?v=4As0e4de-rI",3211');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (283634, "Learn Unity - Beginners Game Development Course", "https://www.youtube.com/watch?v=gB1F9G0JXOo",211');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (562824,"Cracking Enigma in 2021 - Computerphile", "https://www.youtube.com/watch?v=RzWB5jL5RX0",111');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (442452,"Coding Adventure: Chess AI", "https://www.youtube.com/watch?v=U4ogK0MIzqk",671');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (536363,"Coding Adventure: Ant and Slime Simulations", "https://www.youtube.com/watch?v=X-iSQQgOd1A",76');
//             ('INSERT INTO video (id,title,video_url,rating,created_at) VALUES (323445,"Why the Tour de France is so brutal",  "https://www.youtube.com/watch?v=ZacOS8NBK6U",73');
            


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
