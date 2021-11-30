const express = require("express");
const app = express();
let cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
const data = require('../exampleresponse.json');

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = data;

// GET "/"
app.get("/", (req, res) => {
  
  res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  let videoId = Number(req.params.id);
  let result = data.find(video => video.id === videoId)
  if(result) {
    res.status(200).json(result);
  }
  else res.status(400).send('video not found')
});
