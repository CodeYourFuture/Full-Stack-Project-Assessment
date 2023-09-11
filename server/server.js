require("dotenv").config();
const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const bodyParser = require("body-parser");

const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(cors());
pool.connect();




const newVideoValidate = [
  body("title").trim().notEmpty(),
  body("url")
    .trim()
    .notEmpty()
    .isURL()
    .isLength({ min: 30 })
    .withMessage("Warning: YouTube URL Must be Provided as Embed"),
];

// const validateData = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .isLength({ min: 3 })
//     .withMessage("Name must be at less 3 characters"),
//   body("email")
//     .trim()
//     .notEmpty()
//     .isEmail()
//     .toLowerCase()
//     .normalizeEmail()
//     .withMessage("Email must be a valid email"),
//   body("password")
//     .trim()
//     .notEmpty()
//     .withMessage("You must enter your password"),
// ];

// app.get("/", (req, res) => {
//   Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

app.get("/videos/data", async (req, res) => {
  // res.send(videos);
  try {
    const videos = await pool.query("select * from videos").then((result) => {
      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/videos/data/:id", (req, res) => {
  const videoID = Number(req.params.id);
  const getVideoByID = videos.find((video) => video.id === videoID);
  res.status(200).send(getVideoByID);
});

app.post("/videos/data/create", newVideoValidate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTitle = req.body.title;
    const newUrl = req.body.url;

    if (
      !newUrl.startsWith("https://www.youtube.com/embed/") &&
      !newUrl.startsWith("https://www.youtube.com/watch?v=")
    ) {
      res.status(400).json({ message: "Invalid YouTube URL" });
      // res.status(201).json({ message: "Valid YouTube URL" });
    } 

    const query = `INSERT INTO videos(title, url)` + `VALUES ($1, $2)`;
    const result = pool.query(query, [newTitle, newUrl]);
    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({ error: err });
  }
});

app.delete("/videos/data/:id", (req, res) => {
  const videoID = Number(req.params.id);
  const getVideoByID = videos.find((video) => video.id === videoID);
  const index = videos.indexOf(getVideoByID);

  if (!getVideoByID)
    return res.status(404).send(`message: video for ID requested is not found`);

  videos.splice(index, 1);

  fs.writeFile("./exampleresponse.json", JSON.stringify(videos), () => {
    res.status(200).send({
      videos: {
        Message: "Video with id has been deleted successfully",
      },
    });
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
