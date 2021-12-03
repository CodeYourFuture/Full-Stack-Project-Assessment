const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const { Pool } = require("pg");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

app.use(cors());

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);

const pool = new Pool({
  connectionString:
    "postgres://raqrjygcappkuw:1263c0253d7fa322c1790ab439a8dc8af974b2255d79cdb2bb457a99d973280d@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/dapnscot6ihjdt",
  ssl: {
    rejectUnauthorized: false,
  },
  user: "raqrjygcappkuw",
  host: "ec2-54-228-139-34.eu-west-1.compute.amazonaws.com",
  database: "dapnscot6ihjdt",
  password: "",
  port: 5432,
});

// GET all data "/"
app.get("/", (request, response) => {
  const order = request.query.order;
  //order the data according to the votes
  const selectQuery = `SELECT * FROM videos ORDER BY rating ${
    order === "asc" ? "ASC" : "DESC"
  }`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response
        .status(500)
        .send({ msg: "Database ERROR" });
    }
    response.send(result.rows);
  });
});

//GET video by id
app.get("/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const selectQuery = `SELECT * FROM videos WHERE id = ${videoId}`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response
        .status(500)
        .send({ msg: "Database ERROR" });
    }
    if (result.rows.length === 0) {
      return response.status(404).send({
        msg: `Video with id: ${videoId} does not exist !!!`,
      });
    }
    response.send(result.rows);
  });
});

// Create a new video
let temporaryID = 10; //DB WILL CREATE
app.post("/", (request, response) => {
  const title = request.body.title;
  const url = request.body.url;
  if (
    !title ||
    !url ||
    !url.includes("youtube") ||
    !url.includes("watch?v=")
  ) {
    return response.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  const newVideo = {
    title: title,
    url: url,
    date: request.body.date,
    time: request.body.time,
    rating: 0,
  };
  const selectQuery = `INSERT INTO videos (title, url, date,time,rating) VALUES ('${newVideo.title}','${newVideo.url}','${newVideo.date}','${newVideo.time}',${newVideo.rating}) RETURNING id;`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response
        .status(500)
        .send({ msg: "Database ERROR" });
    }
    if (error) {
      response.send(error);
    }
    response.send({ id: result.rows[0].id });
  });
});

// Delete video specified by an ID
app.delete("/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const selectQuery = `DELETE FROM videos WHERE id = ${videoId}`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response
        .status(500)
        .send({ msg: "Database ERROR" });
    }
    if (result.rowCount === 1) {
      return response.status(204).send({});
    }
    return response.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  });
});

//UPDATE votes
app.put("/vote/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const vote = request.body.vote;

  const selectQuery = `UPDATE videos SET rating = rating+${vote} WHERE id = ${videoId} RETURNING rating`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      return response
        .status(500)
        .send({ msg: "Database ERROR" });
    }
    if (result.rowCount === 0) {
      return response.status(404).send({
        result: "failure",
        message: "Video could not be found",
      });
    }
    response.send({ rating: result.rows[0].rating });
  });
});
