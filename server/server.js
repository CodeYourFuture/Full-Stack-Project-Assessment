const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const data = require("./exampleresponse.json");
const cors = require("cors");

app.use(cors());

app.use(express.json());
let count = data.length;
let id = 1;

app.listen(port, () => console.log(`Listening on port ${port}`));

function matchYoutubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(regex)) {
    return true;
  }
  return false;
}

//get all videos
app.get("/", (req, res) => {
  res.send(data);
});

// to create new video
app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (title && matchYoutubeUrl(url)) {
    data.push({ id: count++, title, url });
    return res.sendStatus(201);
  }
  return res.sendStatus(403);
});

// select a video
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find((v) => v.id === Number(id));
  if (item) return res.send(item);
  return res.status(404).send("Id not found");
});

// delete a video
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indexItem = data.findIndex((v) => v.id === Number(id));

  if (indexItem !== -1) {
    data.splice(indexItem, 1);
    return res.status(200).send({});
  }

  res.status(403).send({
    result: "failure",
    message: "Video could not be deleted",
  });
});
