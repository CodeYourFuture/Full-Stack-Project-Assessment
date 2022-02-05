const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

const generateNewId = -1;

// GET "/" => returns all of the videos
app.get("/", (req, res) => {
  res.status(200).json(videos);
});

// POST "/" => add a video to the API
app.post("/", (req, res) => {
  const newVideo = {
    id: generateNewId + 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };

  //validation url
  const isValidUrl = newVideo.url.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );

  if (newVideo.title && isValidUrl) {
    videos.push(newVideo);
    res.status(200).json({ id: newVideo.id });
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

//GET "/{ID}" => returns video with the ID contained within the {id} parameter
app.get("/:id", (req, res) => {
  const filteredVideos = videos.filter((video) => video.id === parseInt(req.params.id));
  if (filteredVideos.length > 0){
    res.status(200).json(filteredVideos);
  } else {
    res.status(400).json({id: `not found`})
  }
})


//Delete "/{id}" => Deletes the video with the ID container within the {id} parameter
app.delete("/:id", (req, res) => {
  const index = videos.findIndex((video) => video.id === parseInt(req.params.id));
  if (index <0){
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
  }else{
    videos.splice(index, 1);
    res.status(200).json({})
  }
})