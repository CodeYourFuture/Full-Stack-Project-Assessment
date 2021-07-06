//const { response, request } = require("express");
const cors = require("cors");
const e = require("express");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

const { Pool } = require("pg");

const pool = new Pool({
  user: "cemzhpuvpzvwjg",
  host: "ec2-54-74-77-126.eu-west-1.compute.amazonaws.com",
  database: "d7hauvmk7pnfj2",
  password: "56efa5b41880034afcb37bafddc90dd258f2641143d61c5e83b46f5d709356b3",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GET "/"
app.get("/", (req, res) => {
  const order = req.query.order === "asc" ? "asc" : "desc";
  const query = `select * from videos order by rating ${order}`;
  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  console.log(title, url);
  const selectQuery = `select * from videos where title=$1 or url=$2`;
  const insertQuery = `insert into videos (title, url, rating ) values ($1,$2,0)`;
  pool.query(selectQuery, [title, url]).then((result) => {
    if (result.rows.length > 0) {
      return res.status(400).send("The video is exists");
    } else {
      pool
        .query(insertQuery, [title, url])
        .then(() => res.send("video added"))
        .catch(() => {
          const error = {
            result: "failure",
            message: "Video could not be saved",
          };
          response.json(error);
        });
    }
  });
});

app.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const query = "select * from videos where id=$1";
  pool
    .query(query, [videoId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.delete("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const error = {
    result: "failure",
    message: "Video could not be deleted",
  };
  selectQuery = `select * from videos where id=$1`;
  deleteQuery = "delete from videos where id =$1";
  pool.query(selectQuery, [videoId]).then((result) => {
    if (result.rows.length === 0) {
      res.send(error);
    } else {
      pool
        .query(deleteQuery, [videoId])
        .then(() => res.send("The video deleted"))
        .catch((e) => console.error(e));
    }
  });
});

app.put("/:id", (req, res) => {
  const videoId = req.params.id;
  const vote = req.body.vote;
  const query = "update videos set rating=rating+$1 where id=$2";
  console.log(videoId,vote);
  pool
    .query(query, [vote, videoId])
    .then(() => res.send("the vote is updated"))
    .catch((e) => console.error(e));
});

