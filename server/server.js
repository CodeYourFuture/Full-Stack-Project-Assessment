const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");


const filePath = "../client/src/exampleresponse.json";

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(__dirname);
});
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// GET "/"

app.get("/:id", (req, res) => {
  res.json(videos.filter(e => e.id == req.params.id))
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  let maxID = Math.max(...videos.map((c) => c.id));
  let dateTime = new Date();
  videos.push({
    id: ++maxID,
    title: req.body.videoTitle,
    url: req.body.videoURL,
    rating: 34,
    isVoted: false,
    vote: 0,
    postedDate: dateTime.toLocaleString(),
  });
  save();

  res.json({
    id: maxID,
    message: " saved successfully",
  });
});

const save = () => {
  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
};
