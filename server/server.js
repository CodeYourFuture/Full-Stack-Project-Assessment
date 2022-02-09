var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 5000;
let videos = require("../exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));



// this Get rout should be commented out if we need to use the rout / for query 
// app.get("/", (req, res) => {
//   res.json(videos);
// });


//Order videos descending/descending , if no query order descending 

app.get("/", (req, res) => {
  // const sorted_desc = videos.sort((a, b) => b.rating - a.rating);
  // const sorted_asc = videos.sort((a, b) => a.rating - b.rating);  
  
  if (
    req.query.order === 'desc' || (Object.keys(req.query).length === 0)
  ) {
    res.json(videos.sort((item1, item2) => item2.rating - item1.rating));
  } 
  if (req.query.order === 'asc') {
    res.json(videos.sort((item1, item2) => item1.rating -item2.rating));
  }
});


//post
app.post("/videos", function (req, res) {
  const video = {
    id: 0,
    title: req.body.title,
    url: req.body.url,
  };

  console.log(req.body);

  if (!video.title || !video.url) {
    return res.status(400).json({
      msg: "Please include a title, and a url",
    });
  } else {
    videos.push(video);
    video.id = videos.indexOf(video) + 1;
    return res.json(videos);
  }
});

// `GET` "/{id}"
app.get("/:id", (req, res) => {
  const idFilter = (req) => (video) => video.id === parseInt(req.params.id);

  const found = videos.some(idFilter(req));

  if (found) {
    res.json(videos.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No video with the id of ${req.params.id}` });
  }
});

// delete
app.delete("/:id", (req, res) => {
  const idFilter = (req) => (video) => video.id === parseInt(req.params.id);
  const found = videos.some(idFilter(req));

  if (found) {
    res.json({});
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});



