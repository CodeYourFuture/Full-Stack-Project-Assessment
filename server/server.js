const express = require("express");
let cors = require("cors");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "test_user",
  host: "dpg-cf84nkun6mplr412k9q0-a.oregon-postgres.render.com",
  //host: "postgres://test_user:mgC8PDhAovGQrULdAtHazqSLuwTXA2F9@dpg-cf60rapa6gdjkk3bbkvg-a.oregon-postgres.render.com/cyf_ecommerce_l80y",
  database: "finalprojectassessmentvideo",
  password: "TbQmOV6PMJIvufL43RpIjz5ad4ZHHrlK",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./../client/src/exampleresponse.json");

//get all example videos
// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
  console.log("Sending videos to client", videos);
  //res.send({ express: "Your Backend Service is Running" });
});

//GET "/{id}"
app.get("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let videoOfId = videos.filter((vid) => vid.id === id);
  console.log(videoOfId);
  res.status(200).send(videoOfId);
});

//POST "/"
app.post("/", function (req, res) {
  console.log("POST / route - video");
  let newVideo = req.body;
  console.log(newVideo, videos.length);
  //checking for an empty object but no need if checking if either fields empty
  //if (!Object.keys(newChat).length)
  if (!(req.body.title || req.body.url)) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    newVideo.id = videos[videos.length - 1].id + 1;
    videos.push(newVideo);
    console.log(newVideo, videos.length);
    res.status(200).json({
      id: newVideo.id,
    });
  }
});

// {
//   "id": 523523
// }

//DELETE "/{id}"

app.delete("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let result = videos.filter((el) => el.id !== id);
  videos = result;
  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(404).send("Incorrect ID, please enter again");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
