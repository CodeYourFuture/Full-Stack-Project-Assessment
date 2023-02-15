const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./data/exampleresponse.json");
// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});
//post add new videos
app.post("/", (req, res) => {
  const addVideo = req.body;
  let newID = videos[videos.length - 1].id + 1;
  if (addVideo.title === "" || addVideo.url === "") {
    res.status(404).json({
      result: "failure",
      message: "Video could not be Saved",
    });
  } else {
    let add = {
      id: newID,
      ...addVideo,
    };
    videos.push(add);
    res.send({ videos });
  }
});
//get video by id
app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filterVideo = videos.filter((vd) => vd.id === id);
  res.send({ filterVideo });
});
// delete video
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filterVideo = videos.filter((vd) => vd.id === id);
  if (filterVideo.length === 0) {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  } else {
    const deleteVideo = videos.filter((vd) => vd.id !== id);
    res.send({ deleteVideo });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
