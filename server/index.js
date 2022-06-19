const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/:ID", (req, res) => {
  const id = req.params.ID;
  const foundVideo = videos.filter((item) => item.id === Number(id));
  res.status(200).json(foundVideo);
  app.get("/", (req, res) => {
    res.json(videos);
  });
});
app.get("/", (req, res) => {
  const order = req.query.order;
  if (order) {
    if (order === "asc") {
      ascVideos = videos
        .slice(0)
        .sort((a, b) =>
          a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
        );
      res.json(ascVideos);
    } else if (order === "desc") {
      descVideo = videos
        .slice(0)
        .sort((a, b) =>
          a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0
        );
      res.json(descVideo);
    }
  } else {
    res.send(videos);
  }
});

app.post("/", (req, res) => {
  let id = Math.floor(Math.random() * 100000);
  const { title, url } = req.body;

  if (title !== "" && url !== "") {
    const newVideo = {
      id: id + 1,
      title: title,
      url: url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(200).json(videos);
  } else {
    res.status(400).json({
      videos: videos,
      result: "error",
      message: "failed to add video",
    });
  }
});
app.delete("/:ID", (req, res) => {
  const id = Number(req.params.ID);
  const videoExists = videos.find((item) => item.id === id);
  if (videoExists) {
    const foundVideoId = videos.findIndex((item) => item.id === id);
    videos.splice(foundVideoId, 1);
    res.json(videos);
  } else {
    res.status(400).json({
      result: "error",
      message: "Video not deleted.",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
