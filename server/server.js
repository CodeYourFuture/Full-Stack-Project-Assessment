const express = require("express");
const app = express();
const uuid = require("uuid"); //to create ID
app.use(express.json());
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
    like: 10,
    dislike: 0,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
    like: 20,
    dislike: 0,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
    like: 30,
    dislike: 0,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
    like: 40,
    dislike: 0,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
    like: 50,
    dislike: 0,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
    like: 60,
    dislike: 0,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
    like: 70,
    dislike: 0,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
    like: 0,
    dislike: 0,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
    like: 0,
    dislike: 0,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
    like: 0,
    dislike: 0,
  },
];

// GET "/"
app.get("/", (req, res) => {
  console.log("hello from get");
  res.json(videos);
});
//POST "/"
app.post("/", (req, res) => {
  console.log("hello from post");
console.log(req.body)
  const newData = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 76,
    like: 0,
    dislike: 0,
  };
  console.log(newData);
  videos = [...videos, newData];
  res.json(newData.id);
  // console.log(videos);
  // res.send("hello")
});

app.delete("/:videoId", function (request, response) {
  console.log("hello from delete path");
  console.log(request.params.videoId);
  videos = videos.filter((video) => {
    return video.id != request.params.videoId;
  });
  console.log(videos.length);
  response.json({});
});

// app.post("/", function (request, response) {
//   // if (
//   //   !request.body.from ||
//   //   request.body.from === "" ||
//   //   !request.body.text ||
//   //   request.body.text === ""
//   // ) {
//   //   response
//   //     .status(400)
//   //     .send(
//   //       "Bad Request-Please fill in the form and re-submit your message!!!"
//   //     );
//   // } else {}
//   //   console.log("hello from post");
//   console.log("hello from post");
//   // console.log(request.body);
//   const newVideo = {
//     id: uuid.v4(),
//     title: request.body.title,
//     url: request.body.url,
//     rating: 76,
//     like: 0,
//     dislike: 0,
//   };
//   videos = [newVideo, ...videos];
//   response.send(hello);
// });
