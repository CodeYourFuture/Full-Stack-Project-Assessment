require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const fs = require("fs").promises;

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  const videos = fs
    .readFile("./exampleresponse.json", "utf8")
    .then((videos) => {
      res.status(200).send({ data: JSON.parse(videos) })
    });
});

app.post("/", (req, res) => {
  res.send("success You have made a post request");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
