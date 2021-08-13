const express = require("express");
var cors = require('cors')
var app = express()

const port = process.env.PORT || 5000;

app.use(cors())

const bodyparser = require('body-parser')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require('./exampleresponse.json');

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  let id = parseInt(req.params.id)

  let foundVid = videos.find(el => el.id == id)

  if (foundVid) res.json(foundVid)
  else res.json({
    "result": "failure",
    "message": "Video could not be found"
  })
});

// Post "/"
app.post("/", (req, res) => {
  console.log(req.body)
  let { title, url } = req.body

  if (!title || !url || url.replace("https://www.youtube.com/watch?v=","").length !== 11) {
    res.json({
      "result": "failure",
      "message": "Video could not be saved"
    })
  } 
  else {
    let ids = videos.map(el => el.id)
    let newId

    do {
      newId = Math.floor(Math.random() * 600000)
    } while (ids.includes(newId))

    let newVid = {}
    newVid.id = newId
    newVid.title = title
    newVid.url = url
    newVid.rating = 0

    videos.push(newVid)
    
    res.json({ "id": newVid.id })
  }
})

// Delete "/{id}"
app.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id)

  let foundVid = videos.find(el => el.id == id)

  if (foundVid) res.json({})
  else res.json({
    "result": "failure",
    "message": "Video could not be deleted"
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));