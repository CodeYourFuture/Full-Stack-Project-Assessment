const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  user: "gzpeczgerzmfze",
  host: "ec2-34-241-164-42.eu-west-1.compute.amazonaws.com",
  database: "de6m2d2609uf5r",
  password: "5a1e59a11cefc89eb997dd206d6740d4328ba4b50f44a82dbbfb65a20520c0f1",
  port: 5432,
});
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"

app.get("/", (request, response) => {
  // Delete this line after you've confirmed your server is running
  response.send("Welcome to video recommendations App!");
});

// GET all videos:

app.get("/videos", (request, response) => {
  const query = `SELECT * FROM videos ORDER BY rating`;
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return response.status(400).send(`msg: ${error}`);
    }
    response.send(result.rows);
  });
});

app.get("videos/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const selectQuery = `SELECT * FROM videos WHERE id = ${videoId}`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response.status(500).send({ msg: "Database ERROR" });
    }
    if (result.rows.length === 0) {
      return response.status(404).send({
        msg: `Video with id: ${videoId} does not exist !!!`,
      });
    }
    response.send(result.rows);
  });
});

app.post("/", function (request, response) {
  const id = request.body.id;
  const title = request.body.title;
  const url = request.body.url;
  if (!id || !title || !url) {
    return response.send({
      result: "upload failed",
      message: "Video could not be added",
    });
  }
  const newVideo = {
    id: id,
    title: title,
    url: url,
    rating: 0,
  };
  const query = `INSERT INTO videos (id, title, url, rating) VALUES (${newVideo.id},'${newVideo.title}','${newVideo.url}',${newVideo.rating}) RETURNING id;`;
  pool.query(query, (error, result) => {
    if (error) {
      return response.send(error);
    }
    response.send({ id: result.rows[0].id });
  });
});

app.delete("/videos/:Id", function (request, response) {
  const index = videos.findIndex((video) => video.id == request.params.Id);
  videos.splice(index, 1);
  response.send(`Message at index ${index} was deleted`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
