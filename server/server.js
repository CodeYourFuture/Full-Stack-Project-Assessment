const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

console.log(`DB_NAME = ${process.env.DB_NAME}`); // to make sure db credentials saved in .env can/are being accessed
if (!process.env.DB_NAME) {
  throw new Error("DB_NAME not defined");
}

app.use(cors());
app.use(express.json()); // needed to parse JSON data

const { Pool } = require("pg");

const db = new Pool({
  // getting db credentials in order to connect
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

db.connect(function (err) {
  // we are telling server to connect to db
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

//////////////////////////// HELP!! BUG WITH POST!! //////////////////////////////
// Adding video through the frontend and Postman but they don't seem to be communicating with each other (eg. vid added from front end but doesn't show in database or vid added from Postman but doesn't show in frontend). frontend & backend not properly syncing ???
////////////////////////////////////////////////////////////////////////

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
    }
    const addNewVideoQuery =
      "INSERT INTO videos (title, url, rating)" +
      "VALUES ($1, $2, $3) RETURNING id";
    const dbResult = await db.query(addNewVideoQuery, [
      newVideo.title,
      newVideo.url,
      123, /// TO CHANGE!! ///
    ]);
    return response.status(201).json(dbResult.rows[0]);
  } catch (error) {
    console.log("Error adding video:", error);
    return response.status(500).json({ error: "Error" });
  }
});

// GET "/{id}"
// Returns the video with the ID contained within the {id} parameter
app.get("/videos/:id", async function (request, response) {
  // HELP!! app.get("/videos/:id", etc... & const fetchVideos = () => {fetch(`${backendUrl}/videos`) -> I have/need 'videos' twice?
  try {
    let videoId = parseInt(request.params.id);

    const dbResult = await db.query("SELECT * FROM videos WHERE id = $1", [
      videoId,
    ]);
    response.status(200).json(dbResult.rows);
  } catch (error) {
    response.status(400).json(error);
  }
});

// DELETE "/{id}"
// Deletes the video with the ID container within the {id} parameter
app.delete("/videos/:id", async function (request, response) {
  try {
    let videoIdDelete = Number(request.params.id);

    const dbResult = await db.query("DELETE FROM videos WHERE id = $1", [
      videoIdDelete,
    ]);
    response.status(200).json({});
  } catch (error) {
    response.status(404).json({
      result: "Failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
