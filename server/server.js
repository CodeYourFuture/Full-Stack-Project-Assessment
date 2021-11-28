const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Import local json data.
const data = require(".././exampleresponse.json");

// Import uuid library
const { v4: uuidv4 } = require("uuid");

// Required when POST comes from a form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET REQUESTS

// GET endpoint `/` with `data` content check
app.get("/", (req, res) => {
  data.length ? res.status(200).json(data) : res.status(204).json(data);
});


// POST REQUESTS

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
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
