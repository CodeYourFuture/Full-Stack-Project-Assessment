const express = require("express");
const app = express();
const data = require("./exampleresponse.json");
const cors = require("cors");

app.use(cors());

app.use(express.json());
let count = data.length;
let id = 1;

function matchYoutubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(regex)) {
    return true;
  }
  return false;
}

//get all videos
//SELECT * FROM videos
app.get("/", (req, res) => {
  res.send(data);
});

// to create new video
//"INSERT INTO videos (title, url, rating) VALUES($1, $2, $3)"
app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  if (title && matchYoutubeUrl(url)) {
    data.push({ id: count++, title, url, rating });
    return res.sendStatus(201);
  }
  return res.sendStatus(403).json({
    result: "failure",
    message: "Video could not be saved",
  });
});

// select a video
//SELECT * FROM videos WHERE id = $1
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find((v) => v.id === Number(id));
  if (item) return res.send(item);
  return res.status(404).send("Id not found");
});

// delete a video
//DELETE FROM videos WHERE id=$1
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

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port 4000`)
);
