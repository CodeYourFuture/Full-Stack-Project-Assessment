const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const generateRandomNumber = () => Math.floor(Math.random() * 10000000);

const videos = [];

// GET "/" : serve all videos
app.get("/", (req, res) => {
  res.json({ videos: videos });
});

// GET "/{id}" : serve one video based on id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const filteredVideos = videos.filter((video) => video.id === parseInt(id));

  filteredVideos.length === 0
    ? res.status(500).json({
        result: "failure",
        message: `Video width id '${id}' could not be found`,
      })
    : res.json(filteredVideos);
});

// POST "/" : add a video
app.post("/", (req, res) => {
  const { title, url } = req.body; // deconstruct the body so we only get the keys we want
  let id;

  // making sure the ID we generate doesn't already exist
  while (true) {
    id = generateRandomNumber();
    if (videos.some((video) => video.id === id)) continue;
    else break;
  }

  const linkValid = url.match(
    /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)$/
  );

  const linkExists = videos.every((video) => video.url !== url);

  if (linkValid === null || !title.trim() || !linkExists)
    return res.status(500).json({
      result: "failure",
      message: "Video could not be saved",
    });

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // January is 0 without the + 1?
  const year = date.getFullYear();

  videos.push({
    title,
    url,
    id,
    rating: 0,
    dateAdded: `${day}/${month}/${year}`,
  });

  res.json({ id: id });
});

// DELETE "/{id}" : remove a video from the array based on an ID
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = videos.findIndex((video) => video.id === parseInt(id));

  if (index === -1)
    return res.status(500).json({
      result: "failure",
      message: "Video could not be deleted",
    });

  videos.splice(index, 1);
  res.json({});
});
