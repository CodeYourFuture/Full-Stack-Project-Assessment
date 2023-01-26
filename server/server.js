const { json } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");

const filePath = "../client/src/exampleresponse.json";

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// GET "/"

//find video by ID

app.delete("/:id", (req, res) => {
  videos = videos.filter((e) => e.id != req.params.id);
  save();
  res.json(videos);
});

app.get("/:id", (req, res) => {
  res.json(videos.filter((e) => e));
});

app.get("/", (req, res) => {
  //let sortedVideos =

  if (req.query.order !== undefined) {
    const order = req.query.order.toLowerCase();
    if (order === "asc") {
      res.json(videos.sort((x, y) => (x.vote > y.vote ? 1 : -1)));
    } else if (order === "desc") {
      res.json(videos.sort((x, y) => (x.vote < y.vote ? 1 : -1)));
    }
  } else {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  }
});

app.post("/", (req, res) => {
  //create new video ID
  let maxID = Math.max(...videos.map((c) => c.id));
  //get current system date and time
  let dateTime = new Date();

  if (req.body.videoTitle == "" && req.body.videoURL == "") {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
    return;
  }

  //add video to the the array
  videos.push({
    id: ++maxID,
    title: req.body.videoTitle,
    url: req.body.videoURL,
    rating: 34,
    isVoted: false,
    vote: 0,
    postedDate: dateTime.toLocaleString(),
  });

  // save it to the file
  save();

  //send OK response
  res.json({
    id: maxID,
    message: " saved successfully",
  });
});

const save = () => {
  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
};
