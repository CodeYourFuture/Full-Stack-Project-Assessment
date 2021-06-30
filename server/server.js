const express = require("express");
const app = express();
const uuid = require("uuid"); //to create ID
app.use(express.json());
const cors = require("cors");
app.use(cors());
const moment = require("moment");
const { Pool } = require("pg");

const pool = new Pool({
  user: "codeyourfuture",
  host: "localhost",
  database: "videos",
  password: "codeyourfuture",
  port: 5432,
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos ORDER BY likecount", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/:id", (req, res) => {
  pool.query(
    `SELECT * FROM videos WHERE videos.id=${req.params.id}`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

//POST "/"
app.post("/", (req, res) => {
  console.log("hello from post");
  console.log(req.body);
  const newData = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
    like: 0,
    dislike: 0,
    dateAdded: moment().format("MMM Do YY"),
  };
  pool.query(
    "INSERT INTO videos (id,title,url,rating,likecount,dislikecount,dateadded) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [
      newData.id,
      newData.title,
      newData.url,
      newData.rating,
      newData.like,
      newData.dislike,
      newData.dateAdded,
    ],

    (error, result) => {
      console.log(newData.dislike);
      res.json(result);
    }
  );
});
//PUT "/"
app.put("/like", (req, res) => {
  const { id, likecount } = req.body;
  pool
    .query("UPDATE videos SET likecount=likecount+1 WHERE id=$1", [id])
    .then(() => {
      pool.query(
        "SELECT likecount FROM videos  WHERE id=$1",
        [id],
        (error, result) => {
          res.json(result.rows);
        }
      );
    })
    .catch((e) => console.error(e));
});
app.put("/dislike", (req, res) => {
  const { id, likecount } = req.body;
  pool
    .query("UPDATE videos SET dislikecount=dislikecount+1 WHERE id=$1", [id])
    .then(() => {
      pool.query(
        "SELECT dislikecount FROM videos  WHERE id=$1",
        [id],

        (error, result) => {
          res.json(result.rows);
        }
      );
    })
    .catch((e) => console.error(e));
});
app.delete("/:videoId", function (request, response) {
  pool.query(
    "DELETE from videos WHERE videos.id=$1",
    [request.params.videoId],

    (error, result) => {
      response.json({ message: "deleted" });
    }
  );
});
