const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

let videos = [{
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
}];

// GET "/"
app.get("/", (req, res) => {
  !videos ? response.status(400).json({
    "result": "failure",
    "message": "Video could not be saved"
  }) :
    res.status(200).json({
      success: true, data: videos
    })

});

//GET BY ID 

app.get("/:id", (request, response) => {
  let videoID = request.params.id
  if (!videoID) {
    return response.status(400).json({
      "result": "failure",
      "message": "the  ID is empty"
    })
  };

  let findingvideo = videos.find(video => video.id === +videoID);

  !findingvideo ? response.status(404).json({ success: false, message: "there is no video with this id" }) :
    response.status(200).json({ "result": "success", data: findingvideo })
});

app.delete("/:id", (request, response) => {
  let videoID = request.params.id;
  if (!videoID) {
    return response.status(400).json({ "result": "failure", "message": "there is an error!" })
  }
  let videoToDelete = videos.find(video => video.id === +videoID || videoID);
  let indexOfvideoToDelete = videos.indexOf(videoToDelete);
  videos.splice(indexOfvideoToDelete, 1)
  !videoToDelete ? response.status(404).json({ success: false, message: "there is no video with this id" }) :
    response.status(200).json({ "result": "success", data: videos })
});


//POST "/"
app.post("/", (request, response) => {
  const uuid = uuidv4();
  const shortUuid = uuid.split('-')[0];

  const { title, url } = request.body;
  const requiredObject = {
    title,
    url
  };

  const missingObject = Object.entries(requiredObject).filter(([key, value]) => {
    return !value
  }).map(([key, value]) => {
    return ` the ${key} is missing`
  })

  if (
    missingObject.length > 0
  ) {
    return response
      .status(400)
      .json({
        "result": "failure",
        "message": missingObject
      });
  }

  if (!isValidYouTubeUrl(url)) {
    return response
      .status(400)
      .json({
        "result": "failure",
        "message": "url is unvalid, please Enter a valid youtube URL"
      });
  }

  videos.push({ id: shortUuid, ...requiredObject, rating: 0 })
  response.status(200).json({ success: true, data: videos })
})

//CHECKING YOUTUBE URL
function isValidYouTubeUrl(url) {
  let youtubePattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{10}[A-Z]$/;
  return youtubePattern.test(url);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));