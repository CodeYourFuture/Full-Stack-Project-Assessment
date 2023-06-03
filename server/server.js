const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
app.use(cors())

const videos = require ("./data.json")
console.log(videos);


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/", (req, res) => {
  const{title, url} = req.body;
  
  res.json(videos);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
