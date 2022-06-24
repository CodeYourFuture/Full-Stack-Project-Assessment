const express = require("express");
const app = express();
const body-parser = require("body-parser");
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require('../client/src/exampleresponse.json');

// GET "/"
app.get("/", (req, res) => {
  res.send(videos)
});

let idsUsed = videos.map(video => video.id);
console.log(Math.max(...idsUsed) + 1);

app.post('/', (req, res) {
  let video = {
    id: (Math.max(...idsUsed) + 1),
    title: 
  }
})


app.listen(port, () => console.log(`Listening on port ${port}`));
