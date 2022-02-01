const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

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

const generateRandomNumber = () => Math.floor(Math.random() * 10000000);

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

  if (linkValid === null || !title.trim())
    return res.status(500).json({
      result: "failure",
      message: "Video could not be saved",
    });

  videos.push({ title, url, id, rating: 0 });
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
