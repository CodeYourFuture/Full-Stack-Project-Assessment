const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.urlencoded());
app.use(express.json());
app.listen(port, function () {
  console.log("Server is listening!");
});

const { Pool } = require("pg");
const pool = new Pool({
  user: "klzydhijtaanrz",

  connectionString:
    "postgres://klzydhijtaanrz:ad95a4e271095b78b9c1b476f66f6524b24ad7f99185033b6487395f3d30d404@ec2-52-54-38-229.compute-1.amazonaws.com:5432/d94341lme3orfj",
  ssl: { rejectUnauthorized: false },

  //  "Heroku CLI":"heroku pg:psql postgresql-asymmetrical-78334 --app cyfvideodb",
  host: "ec2-52-54-38-229.compute-1.amazonaws.com",
  database: "d94341lme3orfj",
  password: "ad95a4e271095b78b9c1b476f66f6524b24ad7f99185033b6487395f3d30d404",
  port: 5432,
});
//get all videos

pool.connect();
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );

  let order = req.query.order;
  let query;
  if (order === "asc") query = "SELECT * FROM videos order by rating asc";
  else query = "SELECT * FROM videos order by rating desc";

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) res.json(result.rows);
      else res.send("no data");
    })
    .catch((e) => res.status(500).send("server error"));
});

app.get("/:id", (req, res) => {
  let videoId = Number(req.params.id);

  const query = "select * from videos where id=$1";

  pool
    .query(query, [videoId])
    .then((result) => {
      if (result.rowCount > 0) res.status(200).json(result.rows);
      else
        res.status(404).json({
          result: "failure",
          message: "Video could not be found",
        });
    })
    .catch((e) => res.status(500).send("server error"));
});

app.post("/", function (req, res) {
  let title = req.body.title;
  let url = req.body.url;
  let rating = 0;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  const newvideo = { title, url };

  let query;
  let isValid = isvalid(newvideo);
  if (isValid) {
    query =
      "Insert into videos(title,url,rating) values($1,$2,$3) Returning id";
    pool
      .query(query, [title, url, rating])
      .then((result) =>
        res.status(200).json({
          id: result.rows[0].id,
        })
      )
      .catch((e) => res.status(500).send("server error"));
  } else {
    res.status(400).send("video cannot be saved,check title and url");
  }
});

const isvalid = ({ title, url }) => {
  if (title.length > 0 && url.length > 0) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
  } else return false;
};

app.delete("/:id", (req, res) => {
  let videoId = Number(req.params.id);

  if (videoId) {
    const query = "delete from videos where id= $1";
    pool
      .query(query, [videoId])
      .then(() => res.status(204).json({}))
      .catch((e) => res.status(500).send("server error"));
  } else {
    res.status(404).send("video cannot be deleted");
  }
});
