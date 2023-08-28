require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const videos = require("./exampleresponse.json")

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.status(200).json(videos);
});

app.post("/", (req, res) => {
  res.send("success You have made a post request");
});


app.listen(port, () => console.log(`Listening on port ${port}`));
