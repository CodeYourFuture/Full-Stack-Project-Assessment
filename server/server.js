const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const lodash = require("lodash");
// const { request } = require("express");

const { Pool } = require("pg");

let pool = new Pool({
  user: "ohxytdcegoysjs",
  host: "ec2-54-73-68-39.eu-west-1.compute.amazonaws.com",
  database: "d5siirmd57b7m5",
  password: "XXXXXXXXX",
  port: 5432,
});

// Store and retrieve your videos from here

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

// GET "/" is used to return all the videos

// I had some help here as my variables outside the endpoint were not getting called

app.get("/", function (request, response) {
  if (request.query.order && request.query.order === "asc") {
    let ascendingVideos = videos.sort((a, b) => {
      return a.rating - b.rating;
    });
    response.send(ascendingVideos);
  } else {
    let descendingVideos = videos.sort((a, b) => {
      return b.rating - a.rating;
    });
    response.send(descendingVideos);
  }
});

// POST "/" is used to add a video to the API

app.post("/", function (request, response) {
  const newVideo = {
    id: parseInt(lodash.uniqueId()),
    title: request.body.title,
    url: request.body.url,
    rating: 0,
    timeSent: new Date(),
  };
  const validateURL = (url) => {
    const validation =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(validation)) {
      return url.match(validation)[1];
    }
    return false;
  };
  if (!request.body.title || !validateURL(request.body.url)) {
    let failureMessage = "Video could not be saved";
    // applied bad request status code
    response.status(400).json(failureMessage);
    return;
  } else {
    videos.push(newVideo);
    response.status(200).json(videos);
  }
});

// GET "/{id}" is used to look at a video by ID

// DO I NEED AN IF ELSE IN CASE ITS NOT SUCCESSFUL?

app.get("/:id", function (request, response) {
  response
    .status(200)
    .send(videos.find((video) => video.id === parseInt(request.params.id)));
});

// DELETE "/{id}" is used to delete a video by ID

app.delete("/:id", function (request, response) {
  let video_to_delete;
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].id == request.params.id) {
      video_to_delete = videos[i];
      videos.splice(i, 1);
      break;
    }
  }
  if (video_to_delete) {
    // status code for accepted
    response.status(202).send(video_to_delete);
  } else {
    // status code for not found
    response.status(404).send(request.params.id);
  }
});
