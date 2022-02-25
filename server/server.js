const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

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
{
  "id": 858566,
  "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
  "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
  "rating": 11
},
{
  "id": 453538,
  "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
  "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
  "rating": 3211
},
{
  "id": 283634,
  "title": "Learn Unity - Beginner's Game Development Course",
  "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
  "rating": 211
},
{
  "id": 562824,
  "title": "Cracking Enigma in 2021 - Computerphile",
  "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
  "rating": 111
},
{
  "id": 442452,
  "title": "Coding Adventure: Chess AI",
  "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
  "rating": 671
},
{
  "id": 536363,
  "title": "Coding Adventure: Ant and Slime Simulations",
  "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
  "rating": 76
},
{
  "id": 323445,
  "title": "Why the Tour de France is so brutal",
  "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
  "rating": 73
}];

const uniqueId = Math.floor(Math.random() * 10000) + 1

// GET "/"
app.get("/", (req, res) => {
    res.status(200).json(videos);
});

// POST "/"
app.post("/", (req, res) => {
  const addVideo = {
    id: videos.some(item => item.id === uniqueId) ? uniqueId + 1 : uniqueId,
    title: req.body.title,
    url: req.body.url,
    rating: 0
  };

  const findMatch = videos.some(item => item.url === addVideo.url);
  const value = addVideo.url.split('=').pop();
if (addVideo.title && value.length === 11 && !findMatch) {
  videos.push(addVideo);
  res.status(200).json({id: addVideo.id})
} else if (findMatch){
  res.status(400).json({ message: `video already exist, add another video!`})
}
 else {
res.status(400).json({result: "failure", message: `Video could not be saved`})
  }
});

// GET "/"
app.get("/:id", (req, res) => {
  const videoWithId = videos.filter(item => item.id === parseInt(req.params.id));
  if (!videoWithId.length) {
    res.status(400).json({message: `id: ${req.params.id} not found`})
  } else {
    res.status(200).json(videoWithId)
  }
});

app.put('/:id', (req, res) => {
  const videoId = videos.findIndex(item => item.id === parseInt(req.params.id));
  const newRating = req.body.rating;
  //console.log(req.body)
  //console.log(newRating);
  if (videoId < 0) {q
    res.status(400).json({message: `id: ${req.params.id} not found`})
  } else {
    videos[videoId].rating = newRating;
    //console.log(videoId);
    res.status(200).json(videoId)
  }
});


// DELETE "/"
app.delete('/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const found = videos.find((item) => item.id === messageId);
  if (found) {
    videos = videos.filter((item) => item.id != messageId);
    res.status(200).json({ message: `Video id: ${messageId} deleted!`});
  } else {
    res.status(400).json({result: 'failure', message: `Video could not be deleted`});
  }
});



// Delete this line after you've confirmed your server is running
  //res.send({ express: "Your Backend Service is Running" });