const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const {
  connect_db,
  init_db,
  get_all_videos,
} = require("./queries");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const db = connect_db();
init_db(db);

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

app.get("/", async (req, res) => {
  try {
    const videos = await get_all_videos(db);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "failed to fetch videos" });
  }
});

app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const newVideos = videos.filter((video) => {
    return video.id !== id;
  });

  if (newVideos.length !== videos.length) {
    videos = newVideos;
    res.send({});
  } else {
    res.send({
      "result": "failure",
      "message": "Video could not be deleted"
    });
  }
});

app.post("/", (req, res) => {
  const {title, url} = req.body;
  if (!url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/)) {
    res.send({
      "result": "failure",
      "message": "Video could not be saved"
    });
  }

  let newId = 0;
  while (videos.some((video => video.id === newId))) {
    newId += 1;
  }

  videos = [
    {
      id: newId,
      title: title,
      url: url,
      rating: 0
    },
    ...videos
  ];
  res.send({
    id: newId
  });
});