const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const data = require("./exampleresponse.json")

const { Pool } = require("pg");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const pool = new Pool({
  connectionString:
    "postgres://cizqaelsftryvl:86de29028efc5869e7ce285ba024d81221decb34bdfbb1ca5fcf803b114def74@ec2-34-242-89-204.eu-west-1.compute.amazonaws.com:5432/d7a8bjr42ugc0s",
  ssl: {
    rejectUnauthorized: false,
  },
  user: "cizqaelsftryvl",
  host: "ec2-34-242-89-204.eu-west-1.compute.amazonaws.com",
  database: "dfosgel6olppk3",
  password: "86de29028efc5869e7ce285ba024d81221decb34bdfbb1ca5fcf803b114def74",
  port: 5432,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// GET "/"
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  const query = "SELECT * FROM fullstack_videos";
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return res.send(error);
    } else {
      res.json(result.rows);
    }
  });
});

// POST "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;
  const newVideo = {
    title: title,
    url: url,
    rating: 0,
  };
  if (!title || !url) {
    return res.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    pool
      .query("SELECT * FROM videos WHERE title=$1 AND url=$2", [title, url])
      .then((result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send(
              `This video with the title of ${title} and url of ${url} is already in videos.`
            );
        } else {
          pool
            .query(
              "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)",
              [title, url]
            )
            .then(() =>
              res.status(202).send(`The video has been added to the videos.`)
            );
        }
      });
  }
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM videos WHERE id=$1";
  pool.query(query, [id]).then((result) => {
    if (result.rows.length === 0) {
      res.status(400).send(`There is no video with the id of ${id}`);
    } else {
      res.status(200).send(result.rows);
    }
  });
});

app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const selectVideoQuery = "SELECT * FROM videos WHERE id=$1";
  pool.query(selectVideoQuery, [videoId]).then((result) => {
    if (result.rows.length === 0) {
      res
        .status(400)
        .send(`Could not delete! There is no video with the id of ${videoId}!`);
    } else {
      const deleteQuery = "DELETE FROM videos WHERE id=$1";
      pool.query(deleteQuery, [videoId]).then(() => {
        res.send(`The video with the id of ${videoId} has been deleted!`);
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));