const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// this was copied from the exampleresponse.json
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
  }
];

app.get("/", (req, res) => {
  res.send(videos);
});

app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const newVideos = videos.filter((video) => {
    return video.id !== id;
  });

  if (newVideos.length !== videos.length) {
    videos = newVideos;
    res.send({});
  } else {
    res.send({
      "result": "failure",
      "message": "Video could not be deleted"
    });
  }
});

app.post("/", (req, res) => {
  const {title, url} = req.body;
  if (!url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/)) {
    res.send({
      "result": "failure",
      "message": "Video could not be saved"
    });
  }

  let newId = 0;
  while (videos.some((video => video.id === newId))) {
    newId += 1;
  }

  videos = [
    {
      id: newId,
      title: title,
      url: url,
      rating: 0
    },
    ...videos
  ];
  res.send({
    id: newId
  });
});