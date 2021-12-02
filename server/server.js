const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

app.listen(port, () => console.log(`Listening on port ${port}`));