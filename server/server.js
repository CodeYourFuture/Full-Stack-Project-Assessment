const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Import local json data
const data = require(".././exampleresponse.json");

// Import uuid library
const { v4: uuidv4 } = require("uuid");

// Enable cross-origin resource sharing middleware in app
app.use(cors());

// Enable POST's from a form in app
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET endpoint `/` with `data` content check
app.get("/", (req, res) => {
  data.length
    ? res
        // .cookie("cookie2", "value2", { sameSite: "none", secure: true })
        .status(200)
        .json(data)
    : res
        // .cookie("cookie2", "value2", { sameSite: "none", secure: true })
        .status(204)
        .json(data);
});

// GET endpoint `/:id`
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const videoIndex = data.findIndex((data) => data.id === id);

  if (videoIndex > -1) {
    res.status(200).json(data[videoIndex]);
  } else {
    res.status(400).json({
      result: "failure",
      message: "No Video with that id",
    });
  }
});

// POST endpoint `/` to add new `video` content with valid field check
app.post("/", (req, res) => {
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };

  const title = req.body.title;
  const url = req.body.url;

  if (title === "" || url === "") {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    data.push(newVideo);
    res.status(201).json({
      id: 523523,
    });
    console.log(newVideo);
  }
});

// DELETE endpoint `/:id` with feedback
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const videoIndex = data.findIndex((data) => data.id === id);

  if (videoIndex > -1) {
    data.splice(videoIndex, 1);
    res.status(200).json({});
    console.log(data);
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

// PUT endpoint `/:id`
app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const videoIndex = data.findIndex((data) => data.id === id);

  if (videoIndex > -1) {
    data[videoIndex].rating = req.body.rating;

    res.status(200).json(data[videoIndex]);
  } else {
    res.status(400).json({
      result: "failure",
      message: "No Video with that id",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
