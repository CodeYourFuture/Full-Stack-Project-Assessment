const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up a connection to the database
const { Pool } = require("pg");
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

// GET "/"
// Returns all the videos
app.get("/", function (request, response) {
  db.query(`SELECT * FROM videos ORDER BY title`)
    .then((result) => {
      response.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Returns video with specific id
app.get("/videos/:id", (request, response) => {
  let id = parseInt(request.params.id);
  db.query("SELECT * FROM videos WHERE id = $1", [id])
    .then((result) => {
      response.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// POST
// This endpoint is used to add a video to the API.
// Both fields - title and url - must be included and be valid for this to succeed.
app.post(
  "/",
  check("title")
    .notEmpty()
    .withMessage("Video could not be saved. Enter a title."),
  check("url")
    .isURL()
    .contains("watch?v=")
    .withMessage("Video could not be saved. Enter a valid Youtube URL."),
  (request, response) => {
    console.log(request.body);
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json(result.array());
    }

    const newTitle = request.body.title;
    const newURL = request.body.url;

    // RETURNING clause returns values after INSERT
    const query = `INSERT INTO videos (title, url)
    VALUES ($1, $2) RETURNING *`;

    db.query(query, [newTitle, newURL])
      .then((result) => {
        console.log(result.rows);
        const newID = result.rows.id;
        const newRating = result.rows.rating;
        response.status(201).json({
          id: newID,
          title: newTitle,
          url: newURL,
          rating: newRating,
          message: "Video was SAVED",
        });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({ message: error });
      });
  }
);

// 500 internal server error

// DELETE
app.delete("/videos/:id", (request, response) => {
  const idToDelete = Number(request.params.id);

  db.query("DELETE FROM videos WHERE id = $1", [idToDelete]);
});

// PUT
app.put("/videos/:id", (request, response) => {
  console.log(request.params.id);
  console.log(request.body.vote);
  const vote = parseInt(request.body.vote);
  const idToUpdate = parseInt(request.params.id);

  db.query("UPDATE videos SET rating = rating + $2 WHERE id=$1", [
    idToUpdate,
    vote,
  ]);
  // if you don't add a response the broswer will keep waiting for one and then give up. add a response!
  response.status(204).end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
