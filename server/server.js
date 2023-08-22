const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // before our routes definition

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
    {
      "id": 523523,
      "title": "Never Gonna Give You Up",
      "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "rating": 23
    },
    {
      "id": 523427,
      "title": "The Coding Train",
      "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
      "rating": 230
    },
    {
      "id": 82653,
      "title": "Mac & Cheese | Basics with Babish",
      "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
      "rating": 2111
    },
];

// GET "/"
app.get("/", (req, res) => {
  res.send(`express: Your Backend Service is Running on ${port}` )
  });
  


