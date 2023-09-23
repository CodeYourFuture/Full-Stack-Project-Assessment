const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const videosData = require("./exampleresponse.json");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let videos = videosData;

app.get("/", (req, res) => {
  res.send(videos);
});

app.get("/:id", (req, res) => {
  const videoID = Number(req.params.id);

  const foundVideo = videos.find((booking) => {
    return booking.id === videoID;
    // returns element || undefined
  });

  foundVideo !== undefined
    ? res.status(200).send(foundVideo)
    : res.status(404).send(`There is no video with id ${videoID}`);
});

app.post("/", (req, res) => {
  // validate the req
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    url: Joi.string().max(100).required(),
  });

  const result = schema.validate(req.body);

  // if error - send details in the response and stop code execution
  if (result.error) {
    res.status(400).send(result.error.details[0].message, {
      result: "failure",
      message: "Video could not be saved",
    }); // ???????
    return;
  }

  const { title, url } = req.body;
  // check if the link is valid
  if (!url.includes("https://www.youtube.com/watch?v=")) {
    res.status(400).send("YouTube url is not valid");
    return;
  }

  // create new obj and push it to the videos array
  const newVideoObj = {
    id: Date.now(),
    title,
    url,
    rating: 0,
  };

  videos.push(newVideoObj);
  res.status(200).send(newVideoObj);
});

app.delete("/:id", (req, res) => {
  const videoID = Number(req.params.id);

  const videoToDelete = videos.findIndex((video) => {
    return video.id === videoID;
    // returns index of the video || -1
  });

  if (videoToDelete !== -1) {
    videos.splice(videoToDelete, 1);
    res.status(200).send(`Deleted video with id: ${videoID}`);
  } else {
    res.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));