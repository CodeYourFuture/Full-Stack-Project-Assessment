const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("../client/src/exampleresponse.json");

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = data;

app.get("/", (req, res) => {
  res.json(videos);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (videos.some((v) => v.id === id)) {
    res.json(videos.find((v) => v.id === id));
  } else {
    res.json({
      result: "failure",
      message: "Video could not be found",
    });
  }
});

app.post("/", (req, res) => {
  const video = {
    id: videos.length,
    title: req.body.title,
    url: req.body.url,
  };

  if (!Object.values(video).every((v) => v)) {
    return res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  videos.push(video);
  res.json({ id: videos.length });
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if(videos.some(v => v.id === id)) {
    videos = videos.filter(v => v.id !== id);
    return res.json({});
  }

  res.json({
    result: "failure",
    message: "Video could not be deleted",
  })
})
