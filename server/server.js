const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("/home/coder/Desktop/CYF/Full-Stack-Project-Assessment/client/src/exampleResponse.json");

// GET "/"
// This endpoint is used to return all of the videos
app.get("/", function (request, response) {
  response.json(videos);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
