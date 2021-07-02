const express = require("express");
const app = express();
const uuid = require("uuid"); //to create ID
app.use(express.json());
const cors = require("cors");
app.use(cors());
const moment = require("moment");
const { Pool } = require("pg");

// const pool = new Pool({
//   user: "codeyourfuture",
//   host: "localhost",
//   database: "videos",
//   password: "codeyourfuture",
//   port: 5432,
// });

const pool = new Pool({
  user: "qsheykcsepemxx",
  host: "ec2-52-86-2-228.compute-1.amazonaws.com",
  database: "d35012gec0g7i1",
  password: "7f4e86a4a7508fb33177c09bcc0682c4b30763acddc96cc127033cac6e92f7e7",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  // pool.query("SELECT * FROM videos ORDER BY likecount", (error, result) => {
  pool.query("SELECT * FROM videos", (error, result) => {
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
    likecount: 0,
    dislikecount: 0,
    dateadded: moment(new Date()).format("YYYY-MM-DD"),
  };
  console.log(newData.dateadded);
  pool.query(
    // "INSERT INTO videos (id,title,url,rating,like,dislike,dateAdded) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    "INSERT INTO videos (id,title,url,rating,likecount,dislikecount,dateadded) VALUES ($1,$2,$3,$4,$5,$6,$7)",

    [
      newData.id,
      newData.title,
      newData.url,
      newData.rating,
      newData.likecount,
      newData.dislikecount,
      newData.dateadded,
    ],

    (error, result) => {
      console.log(newData.dislikecount);
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
