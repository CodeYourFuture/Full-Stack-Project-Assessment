const express = require("express");
const app = express();
const cors = require("cors");
const vidData = require("./exampleresponse.json");
const port = process.env.PORT || 5000;

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...vidData];
// - - functions - - //
function getNewUniqueId(array) {
  // request an array of ids from the database
  //or check the lenth of of he object array
  const min = 1000; // Minimum 6-digit number (inclusive)
  const max = 9999; // Maximum 6-digit number (inclusive)
  let newId;
  do {
    newId = Math.floor(Math.random() * (max - min + 1)) + min; // generate a random number between 1 and 1000
  } while (array.some((obj) => obj.id === newId)); // check if the id already exists in the array
  return newId;
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

/* app.use("/videos", require("./routes/api/videos")); */

//example routes

app.get("/videos", (req, res) => {
  res.json({ allVideoes: "all videoes", videoes: vidData });
});

app.post("/videos", (req, res) => {
  if (!req) {
    return res.json({
      videoAddError: {
        result: "failure",
        message: "Video could not be saved",
      },
    });
  }
  //const id = req.body.id;
  const uniId = getNewUniqueId(videos);
  console.log(req.body);
  const title = req.body.title;
  const url = req.body.url;
  const rating = 0;
  const newVidToAdd = {
    id: uniId,
    title,
    url,
    rating,
  };

  res.json({
    addedData: { info: "new video added", uniqueId: `${uniId}`, videoAdded: newVidToAdd },
  });
});

app.get("/videos/search", (req, res) => {
  //const tags = req.query.tags.split(",");
  const tag = req.query.tag;

  //const idInPram = req.params.idp;

  const order = req.query.order;
  if (!order) {
    // do someting that excludes order from the query and without returning an errorr //
    console.log("no order was requested");
  }

  res.json({
    order: order,
    query: tag,
    oneVideo: {
      info: "only search video",
      details: {
        id: 1,
        title: "Never Gonna Give You Up",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        rating: 23,
      },
    },
  });
});

app.delete("/videos/:idp", (req, res) => {
  if (!req) {
    return res.json({
      videoAddError: {
        result: "failure",
        message: "Video could not be deleted",
      },
    });
  }
  const idInPram = req.params.idp;
  res.json({ allVideoes: { info: " video deleted", videoId: `${idInPram}` } });
});
app.get("/videos/:idp", (req, res) => {
  const idInPram = req.params.idp;

  res.json({
    param: idInPram,
    oneVideo: {
      info: "only one video",
      details: {
        id: 1,
        title: "Never Gonna Give You Up",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        rating: 23,
      },
    },
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
