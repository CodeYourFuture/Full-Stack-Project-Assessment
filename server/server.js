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

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//     like: 10,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//     like: 20,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//     like: 30,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//     like: 40,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//     like: 50,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//     like: 60,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//     like: 70,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//     like: 0,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//     like: 0,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//     like: 0,
//     dislike: 0,
//     dateAdded: moment().format("MMM Do YY"),
//   },
// ];

// GET "/"
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos ORDER BY likecount", (error, result) => {
    res.json(result.rows);
  });
  // res.json(videos);
});
app.get("/:id", (req, res) => {
  pool.query(
    `SELECT * FROM videos WHERE videos.id=${req.params.id}`,
    (error, result) => {
      res.json(result.rows);
    }
  );
  // const oneVideoData = videos.filter((video) => {
  //   return req.params.id == video.id;
  // });
  // res.json(oneVideoData);
});

//POST "/"
app.post("/", (req, res) => {
  console.log("hello from post");
  console.log(req.body);
  const newData = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 76,
    like: 500,
    dislike: 500,
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
app.put("/", (req, res) => {
  const { id, likecount } = req.body;

  pool
    .query(
      "UPDATE videos SET likecount=likecount+1 WHERE id=$1",
      [id],
      (error, result) => {
        console.log(newData.dislike);
      }
    )
    .then(
      "SELECT likecount FROM videos  WHERE id=$1",
      [id],

      (error, result) => {
        res.json(result.rows);
      }
    );
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
