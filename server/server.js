const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const data = require("../exampleresponse.json");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...data];

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

app.get("/", (req, res) => {
  // console.log(videos)
  res.json(videos);
});

app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  // console.log(req.body)
  const newData = {
    id: uuidv4(),
    title,
    url: `https://www.youtube.com/embed/${url}`,
    rating: rating?rating:0,
  };

  if (!newData.title || !newData.url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  videos.push(newData);

  console.log("enviou alguma coisa");
  res.json(videos);
});

// https://www.youtube.com/embed/o1-Iddifryw

// Read one message specified by an ID
app.get("/:id", (req, res) => {
  const foundId = videos.filter((i) => i.id === req.params.id);

  if (foundId) {
    res.status(200).json(foundId);
  }
});

// app.get("/messages/search", (req, res) => {
//   const { text } = req.query;
//   console.log({text})
//   const filteredMessages = messages.filter((message) => message.text.includes(text))
//   console.log(filteredMessages)

//   res.json(filteredMessages)
// })

// // Delete a message, by ID
app.delete("/:id", (req, res) => {
  const foundId = videos.filter((i) => i.id === req.params.id);

  if (foundId) {
    return res.status(200).json({
      msg: `Video id: ${req.params.id} deleted `,
      "All videos: ": videos.filter((i) => i.id !== req.params.id),
    });
  }else{
    return res.status(404).json({
      result: "failure",
      message: "Video could not be deleted"
    })
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
