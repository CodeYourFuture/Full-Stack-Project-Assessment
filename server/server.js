const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("./exampleresponse.json");
const cors = require("cors");
app.use(express.json());
app.use(cors());
let id = 1;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// URL validation check function
  const validationCheck = (url) => {
    let regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)){
      return true;
    }
    return false;
  };


// GET "/"
app.get("/", (req, res) => {
  res.send(data);
});

app.post("/", (req, res) => {
  const { title, url} = req.body;
  if (title && validationCheck(url)){
    data.push({title, url, id: id++})
    return res.status(201).send({id:id});
  }
    return res.status(403).send({
      result: "failure",
      message: "Video could not be saved",
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const filteredId = data.find( (e) => e.id ==id);
  if (filteredId) res.send(filteredId);
  return res.status(404).send(`Video with the id ${id} is not found`);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indexOfVideo = data.findIndex((e) => e.id == id);

  if (indexOfVideo !== -1){
    data.splice(indexOfVideo, 1);
    return res.send({});
  } 
  return res.send({
    result: "failure",
    message: "Video could not be deleted",
  });
});

