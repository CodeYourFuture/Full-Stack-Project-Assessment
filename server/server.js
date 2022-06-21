const express = require("express");
const cors = require("cors");
const moment = require("moment");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

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
    id: 826536,
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
    title: "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
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

  console.log(req.query)
  // res.send(videos);
});

const generateRandomId = (arr) => {
  const randomId = Math.floor(100000 + Math.random() * 900000);
  const alreadyHasId = arr.some((video) => video.id === randomId);
  if (alreadyHasId) {
    generateRandomId(arr);
  } else {
    return randomId;
  }
};

app.post("/", (req, res) => {
  const id = generateRandomId(videos);
  const title = req.body.title;
  const url = req.body.url;
  const validYoutubeUrlPattern = new RegExp(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
  );
  if (title === "" || !url.match(validYoutubeUrlPattern)) {
    return res.status(400).json({
      msg: `${
        title === ""
          ? "Please add the video title"
          : url === ""
          ? "Please enter a Youtube Url"
          : "Please enter a valid YouTube Url"
      }`,
    });
  } else {
    videos.push({
      id,
      title,
      url,
      rating: 0,
      dateAdded: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    res.status(201).json({msg: "Your video has been added"});
  }
});

app.get("/:id", (req, res) => {
  const findVideo = videos.some((video) => video.id === Number(req.params.id));
  console.log(findVideo)
  if (findVideo) {
    res.send(videos.filter((video) => video.id === Number(req.params.id))[0])
  } else {
    res.status(404).send(`Sorry, there is no video with id ${req.params.id}`)
  }
})


app.delete("/:id", (req, res) => {
  const findVideo = videos.some((video) => video.id === Number(req.params.id));
  if (findVideo) {
    videos = videos.filter((video) => video.id !== Number(req.params.id));
    res.json({ msg: "Video deleted successfully", videos });
  } else {
    res.status(404).send(`Sorry, there is no video with id ${request.params.id}`);
  }
});