const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
  },
];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

// `GET` "/{id}"

app.get("/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);

  res.send(videos.find((element) => element.id === id));
});

// `DELETE` "/{id}"

app.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);

  const result = videos.filter((element) => element.id !== id);
  videos = result;

  // console.log(result);

  const findId = videos.find((element) => element.id === id);

  if (findId === undefined) {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  } else {
    res.status(200).send({});
  }
});

// `POST` "/"

app.post("/", function (req, res) {
  console.log("POST /");

  let newVideo = {
    id: videos.length + 1,
    title: req.body.title,
    url: req.body.url,
  };
  if (!newVideo.id || !newVideo.url) {
    res.status(400).send(`New video not uploaded!`);
  } else {
    videos.push(newVideo);
    res.status(200).send(`Video uploaded successfully`);
  }
});
