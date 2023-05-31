const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

// GET "/running"
app.get("/running", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/" This endpoint is used to return all of the videos
app.get("/", (req, res) => {
  res.send(videos);
});

// `POST` This endpoint is used to add a video to the API.
app.post("/", (req, res) => {
  const { title, url } = req.body;
  const newVideo = {
    id: videos.length + 1,
    title: title,
    url: url,
    rating: videos.length + 1,
  };

  if (!newVideo.title || !newVideo.url) {
    return res
      .status(400)
      .json({ msg: "something in the input was falsey" });
  }

  videos.push(newVideo);
  res.status(200).json({ message: "New video added", videos });
});


// `GET` "/{id}"
app.get("/:id", function(req, res) {
  const findId = Number(req.params.id)
  const video = videos.find((video) => findId == video.id)
  res.json({video})
})

//`DELETE` "/{id}"

app.delete("/:id", (req, res) => {
  const findVideo = videos.find(
    (video) => video.id === Number(req.params.id)
  );

  if (findVideo) {
    videos = videos.filter((video) => video.id !== Number(req.params.id));
    res.json({ message: `Video ${req.params.id} deleted` });
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be found" });
  }
});