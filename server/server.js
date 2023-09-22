const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

// app.listen(port, () => console.log(`Listening on port ${port}`));

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

// GET "/" ....confirms server is running
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});


// This endpoint is used to return all of the videos
app.get("/videos", (req, res) => {
  res.status(200).json({ videos });
});


// This endpoint is used to add a video to the API.
app.post("/videos", (req, res) => {
  try {
    let newVideo = {
      id: 0, // should add new id to video 5 digit...need to fix this
      title: req.body.title,
      url: req.body.url,
      rating: 0
    };

    if (!newVideo.title || !newVideo.url || !newVideo.url.startsWith("https://www.youtube.com")) {
      res.status(404).send({
        result: "failure",
        message: "Video could not be saved",
      });
    } else {
      const videoid = videos.map((video) => video.id);
      const id = Math.max(...videoid) + 1;
      
      videos.push(newVideo);
      res
        .status(201)
        .send({
          message: "Video saved successfully",
        })
        .json({ newVideo });
    }

  } catch (error) {
  }
});

// Returns the video with the ID contained within the {id} parameter.

app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.");
  } else {
    res.status(200).json({ matchingVideo });
  }
});

//Deletes the video with the ID container within the {id} parameter

app.delete("/videos/:id", (req, res) => {
  let id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });

  if (!matchingVideo) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
      id: id
    })
  } else {
    const videoIndexToBeDeleted = videos.indexOf(matchingVideo);
    videos.splice(videoIndexToBeDeleted, 1);
    res.status(200).json({
      title: matchingVideo.title,
      message: "Video deleted successfully!",
    });
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
