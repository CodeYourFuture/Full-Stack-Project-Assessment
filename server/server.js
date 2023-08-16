const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const app = express();
const videosData = JSON.parse(fs.readFileSync("./exampleresponse.json"));
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosData;

const validateData = [
  body("title").trim().notEmpty(),
  body("url").trim().notEmpty().isURL(),
  body("name")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name must be at less 3 characters"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .toLowerCase()
    .normalizeEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("You must enter your password"),
];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos/data", (req, res) => {
  res.send(videos);
});

app.get("/videos/data/:id", (req, res) => {
  const videoID = Number(req.params.id);
  const getVideoByID = videos.find((video) => video.id === videoID);
  res.status(200).send(getVideoByID);
});

app.post("/videos/data/create", validateData, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newId = videos[videos.length - 1].id + 1;
  const { title, url } = req.body;

  const newVideo = Object.assign({ id: newId }, req.body);

  videos.push(newVideo);

  fs.writeFile("./exampleresponse.json", JSON.stringify(videos), () => {
    res.status(201).send({
      videos: {
        newVideo,
      },
    });
  });
});

app.delete("/videos/data/:id", (req, res) => {
  const videoID = Number(req.params.id);
  const getVideoByID = videos.find((video) => video.id === videoID);
  const index = videos.indexOf(getVideoByID);

  if (!getVideoByID)
    return res
      .status(404)
      .send(`message: booking for ID requested is not found`);

  videos.splice(index, 1);

  fs.writeFile("./exampleresponse.json", JSON.stringify(videos), () => {
    res.status(200).send({
      videos: {
        Message: "Video with id has been deleted successfully",
      },
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
