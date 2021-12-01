const express = require("express");
const app = express();
let cors = require("cors");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const data = require('../exampleresponse.json');
const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

const timeFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}-${minutes}-${seconds}`;
};
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = data;

// GET "/"
app.get("/", (req, res) => {
  let order = req.query.order;
  if (order === 'asc') {
    data.sort((a, b)=>a.rating-b.rating)
  }
  else   data.sort((a, b) => b.rating - a.rating);
  res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  let videoId = Number(req.params.id);
  let result = data.find(video => video.id === videoId)
  if(result) {
    res.status(200).json(result);
  }
  else res.status(400).json({
    result: "failure",
    message: "Video could not be found",
  });
});
app.delete("/:id", (req, res) => {
  let videoId = Number(req.params.id);
  let searchedId;
  let result = data.find((video, index) => { if (video.id === videoId) { searchedId = index;return video }});
  if (result) {
    data.splice(searchedId, 1);
    res.status(200).json(data);
  } else res.status(400).json({
    result: "failure",
    message: "Video could not be deleted",
  });
});
app.post("/", function (req, res) {
  let id = Math.floor(Math.random() * 100000000) + 1;
  let title = req.body.title;
  let url = req.body.url;
  let rating = 0;
  let date = dateFormat(new Date());
  let time = timeFormat(new Date());

  const newvideo = { id, title, url, rating, date, time };
//res.json(newvideo)
  let isValid = isvalid(newvideo);
  if (isValid) {
    data.push(newvideo);
    res.json({ msg: 'video posted', data: newvideo })
  }
  else {
    res.status(400).json({
      "result": "failure",
      "message": "Video could not be saved"
    })
  }
});




const isvalid = ({ title, url }) => {
  if (title.length > 0 && url.length > 0) {
    var regExp =  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
    
   }
    else return false;
 };