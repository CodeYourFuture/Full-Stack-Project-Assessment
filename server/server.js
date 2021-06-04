const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const vidsData = require("./vidsData");

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];
videos = vidsData;

// GET "/"
app.get("/", (req, res) => {
  res.status(200).json(videos);
});

// To add a valid youtube ID/URL
app.post("/", (req, res) => {
  let title = req.body.title;
  let url = req.body.url;
  let id = Date.now();
  let newVideo = {
    id: id,
    title: title,
    url: url,
    rating: 0,
  };
  const regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const match = url.match(regExp);
  if (title === "" || !title) {
    res.status(400).json({ message: "Title should not be empty!" });
  } else if (!match || url === "") {
    res.status(400).json({ message: "Invalid URL!" });
  } else {
    videos.push(newVideo);
    res
      .status(201)
      .json({ message: `Video by the id ${id} loaded successfully!` });
  }
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  let newList = [...videos];
  let vidById = newList.filter((list) => list.id.toString() === id);
  res.json(vidById);
});

// to delete a video by ID
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  videos.filter((list) => list.id.toString() !== id);
  res.json({ message: `Video by the id ${id} deleted successfully!` });
});
