const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

console.log(`DB_NAME = ${process.env.DB_NAME}`);
if (!process.env.DB_NAME) {
  throw new Error("DB_NAME not defined");
}

app.use(cors());
app.use(express.json()); // needed to parse JSON data

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

// GET "/"
// This endpoint is used to return all of the videos
app.get("/videos", async function (request, response) {
  // response is an empty object as of now
  try {
    const dbResult = await db.query("SELECT * FROM videos"); // we are going to fill the response object with the database query result
    response.json(dbResult.rows);
  } catch (error) {
    console.log("Error fetching data from the database:", error);
    response.status(500).json({ error: "Error" });
  }
});

// POST "/"
// This endpoint is used to add a video to the API.
app.post("/videos", async function (request, response) {
  try {
    let newVideo = request.body;

    if (!newVideo.title || !newVideo.url) {
      response.status(400).json({
        result: "Failure",
        message: "Video could not be saved",
      });
    } else {
      const addNewVideoQuery =
        "INSERT INTO videos (title, url, rating)" +
        "VALUES ($1, $2, $3) RETURNING id";
      const dbResult = await db.query(addNewVideoQuery, [
        newVideo.title,
        newVideo.url,
        123, /// TO CHANGE!! ///
      ]);
      response.status(201).json(dbResult);
    }
  } catch (error) {
    console.log("Error adding video:", error);
    response.status(500).json({ error: "Error" });
  }
});

// GET "/{id}"
// Returns the video with the ID contained within the {id} parameter
app.get("/:id", function (request, response) {
  let selectedVideo = videos.filter(
    (video) => video.id === Number(request.params.id)
  );
  response.status(404).json(selectedVideo);
});

// DELETE "/{id}"
// Deletes the video with the ID container within the {id} parameter
app.delete("/:id", function (request, response) {
  let videoIdDelete = Number(request.params.id);
  const videoIndex = videos.findIndex(({ id }) => id === videoIdDelete);
  if (videoIndex >= 0) {
    videos.splice(videoIndex, 1);
    response.json({});
  } else {
    response.status(404).json({
      result: "Failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
