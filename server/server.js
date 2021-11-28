const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);

const videos = require("./exampleData.json");

// GET all data "/"
app.get("/", (req, res) => {
  res.send(videos);
});
