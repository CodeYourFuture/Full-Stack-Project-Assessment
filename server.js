const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const { Pool } = require("pg");
require("dotenv").config();
const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
};

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT

const proConfig = { connectionString: process.env.DATABASE_URL };

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

pool.connect();
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET all videos:

app.get("/", (request, response) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Credentials", true);
  response.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  const query = `SELECT * FROM videos`;
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return response.status(400).send(`msg: ${error}`);
    }
    response.send(result.rows);
  });
});

app.post("/", function (request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Credentials", true);
  response.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
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

app.get("/:videoId", (request, response) => {
  const videoId = request.params.videoId;
  const query = `SELECT * FROM videos WHERE id =$1`;
  pool.query(query, [videoId]).then((result, error) => {
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

app.delete("/:id", function (request, response) {
  const id = request.params.id;
  const query = `SELECT * FROM videos WHERE id=$1`;
  pool.query(query, [id]).then((result) => {
    if (result.rows.length === 0) {
      response
        .status(400)
        .send(`Could not be deleted! There is no video with the id of ${id}!`);
    } else {
      const deleteQuery = "DELETE FROM videos WHERE id=$1";
      pool.query(deleteQuery, [id]).then(() => {
        response.send(`The video with the id ${id} has been deleted!`);
      });
    }
  });
});

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
