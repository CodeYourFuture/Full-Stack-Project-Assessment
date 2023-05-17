const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
app.use(bodyParser.json());

let videos = [
  {
    id: "keZdZjpZWnY",
    title: "[5/10/2023] Judy Justice S02",
    url: "https://www.youtube.com/watch?v=keZdZjpZWnY",
    rating: 11,
  },

  {
    id: "hplD4QyV4Q8",
    title: "Squash - Trending",
    url: "https://www.youtube.com/watch?v=hplD4QyV4Q8",
    rating: 230,
  },

  {
    id: "xlMGUWjIitk",
    title: "1 In A Trillion Moments in Sports",
    url: "https://www.youtube.com/watch?v=5BeEjfq5dYI",
    rating: 73,
  },

  {
    id: "v=qO--eo7xyV4",
    title: "The Simpsons | Best Moments",
    url: "https://www.youtube.com/watch?v=qO--eo7xyV4",
    rating: 3211,
  },

  {
    id: "kbKty5ZVKMY",
    title: "Learn Basic SQL in 15 minutes",
    url: "https://www.youtube.com/watch?v=kbKty5ZVKMY",
    rating: 211,
  },
  {
    id: "7dPlIY6GPho",
    title: "100 Amazing Phone Cases - Life Hacks",
    url: "https://www.youtube.com/watch?v=7dPlIY6GPho",
    rating: 111,
  },
  {
    id: "71h8MZshGSs",
    title: "ABC Song + More Nursery Rhymes & Kids Songs - CoComelon",
    url: "https://www.youtube.com/watch?v=71h8MZshGSs",
    rating: 171,
  },
  {
    id: "h7spCXYLndY",
    title: "Easy Summer Box Braids! (Beginner Friendly)",
    url: "https://www.youtube.com/watch?v=h7spCXYLndY",
    rating: 76,
  },
  {
    id: "uhYiRmGURwE",
    title: "I Turned Dollar Store Food Gourmet",
    url: "https://www.youtube.com/watch?v=uhYiRmGURwE",
    rating: 23,
  },

  {
    id: "zJytmRO8K7M",
    title: "Osocity Soca Maix - Best Of Old School",
    url: "https://www.youtube.com/watch?v=zJytmRO8K7M",
    rating: 2111,
  },
];

// GET "/"
app.get("/videos", (request, response) => {
  response.status(200).send(videos);
});

// POST"/"
app.post("/videos", function (request, response) {
  // console.log(request.body.url.split("="));
  const videoTitle = request.body.title;
  const VideoUrl = request.body.url;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

  if (!videoTitle) {
    return response
      .status(400)
      .json({ message: "Please add a title for your video" });
  }
  if (!VideoUrl) {
    return response.status(400).json({ message: "Please enter a url" });
  }

  if (request.body.url.match(youtubeRegex) === null) {
    return response.status(400).json({ message: "Please add a valid url" });
  }

  request.body.id = request.body.url.replace(
    "https://www.youtube.com/watch?v=",
    ""
  );
  request.body.likes = 0;
  request.body.dislikes = 0;
  videos.push(request.body);

  videos.find((video) => video.id === request.body.id)
    ? response.status(201).json(request.body)
    : response.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
});

app.get("/videos/:id", function (request, response) {
  const videoId = request.params.id;
  let video = videos.find((video) => video.id === videoId);
  video ? response.send(video) : response.status(404);
});

app.delete("/videos/:id", function (request, response) {
  const videoId = request.params.id;
  videos.find((video) => video.id === videoId)
    ? (videos = videos.filter((video) => {
        return video.id !== videoId;
      }))
    : response.status(404);
  response.send(videos).status(204);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
