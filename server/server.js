const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

let videos = require("..//client/src/data/exampleresponse.json");

// GET "/" all videos
app.get("/", (req, res) => {
  res.send(videos);
});
