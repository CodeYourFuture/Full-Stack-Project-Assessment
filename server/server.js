const express = require("express");
const app = express();

const cors = require("cors")
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let data = [
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
  }
];


// GET "/"
app.get("/videos", (req, res) => {
  res.send(data);
});

let count = 999999;
app.post("/videos", (req, res) => {
  data.push({
    id: count,
    ...req.body,
  });
  count += 1;
  res.send(data);
});


app.put("/videos", (req, res) => {
  const videoId = req.body.id;
  const newRating = req.body.rating;
  data.filter((video) => video.id === videoId).map(video => video.rating = newRating)
  res.send(data)

})

app.delete("/videos", (req, res) => {
  const videoId = req.body.id;
  let indexOfVideo = data.findIndex(video => video.id === videoId)
  if (indexOfVideo < 0) {
    response.status(404).send(`No video was found with id ${videoId}`)
  }
  else {
    data.splice(indexOfVideo, 1)
    res.send(data);
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
