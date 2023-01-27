const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5001;
const videosjson = require("./exampleresponse.json");

app.use(cors({ origin: "*" }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosjson;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (req, res) => {
  res.send(videos);
});
