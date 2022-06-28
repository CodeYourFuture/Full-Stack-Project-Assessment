const express = require("express");
const app = express();
const videosData = require("./exampleresponse.json");
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = videosData;

app.get("/", (req, res) => {
  res.send(videosData);
});
