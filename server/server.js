const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
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

// retrieve a video matching the provided ID
app.get("/:videoId", (req, res) => {
  const id = parseInt(req.params.videoId);
  const video = videos.find((video) => video.id === id)
  if(video){
    res.send(video)
  }else{
    res.status(400).send("ID not found.")
  }
})

// retrieve all videos
app.get("/", (req, res) => {
  res.send(videos);
});

// add a video providing a title and URL
app.post("/", (req, res) => {
  const body = req.body;
  const bKeys = Object.keys(body);
  if(bKeys.includes("title") && bKeys.includes("url")){
    //template video
    const thisVid = { id:0, title:"", url:"" };
    let id = videos.length;
    const checkId = () => {
      //if id exists
      if (
        videos.find((video) => {
          video.id = id;
        }) !== undefined
      ) {
        id++;
        //check again
        checkId();
      }
    };
    //create the video and push to data bank
    thisVid.id = id;
    thisVid.title = body.title;
    thisVid.url = body.url;
    videos.push(thisVid);
    res.send(`Successfully added your video with ID: ${id}`);
  }
  else{
    res.status(400).send("Unsuccessful request");
  }
})

app.delete("/:videoId", (req, res) => {
  const id = parseInt(req.params.videoId);
  const video = videos.find((vid) => vid.id === id);
  const index = videos.findIndex((vid) => vid.id === id);
  console.log(`\
              id: ${id}
              video: ${video}
              index: ${index}`
            );
  if (video) {
    videos.splice(index,1);
    res.send(`Deleted video with ID: ${id}, title: ${video.title}`);
  } else {
    res.status(400).send("ID not found.");
  }
})