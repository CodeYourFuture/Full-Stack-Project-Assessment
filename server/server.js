const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors')

// !IMPORTANT
// temporary solution to start working in inside the client with async 

const arrayOfVideosObj = require('./../exampleresponse.json')

app.use(cors())

app.get("/api/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.status(200).json({
    status: "success",
    length: arrayOfVideosObj.length,
    data: arrayOfVideosObj,
  });
});


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"


app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));