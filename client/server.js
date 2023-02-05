const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");

const app = express();
//app.use(express.static(path.resolve(__dirname, "../build")));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: "cyf",
  host: "dpg-cffsda82i3mg6p9tkeag-a.frankfurt-postgres.render.com",
  database: "yt_videos",
  password: "SuHGK5ii0vUrMbQFgEsN1zudxGXWTtEH",
  port: 5432,
  ssl: true,
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "YT_videos",
//   password: "omid",
//   port: 5432,
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.json({ message: "connection established." });
});

app.post("/", (req, res) => {
  //create new video ID
  // let maxID = Math.max(...videos.map((c) => c.id));
  // //get current system date and time
  let dateTime = new Date();
  const videoTitle = req.body.videoTitle;
  const videoURL = req.body.videoURL;

  if (videoTitle == "" && videoURL == "") {
    res.json({
      result: "failure",
      message: "Faild to save video",
    });
    return;
  }
  console.log(`${videoTitle} :: ${videoURL}`);
  //add video to the the array

  pool
    .query(
      `Insert into videos(title,url,rating,isvoted,vote,posteddate) values($1,$2,$3,$4,$5,$6)`,
      [videoTitle, videoURL, 0, false, 0, dateTime.toLocaleString()]
    )
    //.then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });

  pool
    .query(`SELECT * FROM videos`)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });

  // videos.push({
  //   id: ++maxID,
  //   title: req.body.videoTitle,
  //   url: req.body.videoURL,
  //   rating: 34,
  //   isVoted: false,
  //   vote: 0,
  //   postedDate: dateTime.toLocaleString(),
  // });

  // save it to the file
  //save();

  //send OK response
  // res.json({
  //   id: maxID,
  //   message: " saved successfully",
  //   videos: videos,
  // });
});

app.get("/order", (req, res) => {
  //res.json({ message: "successfull executeed " + req.query.by });

  //Sort the videos

  if (req.query.by !== undefined) {
    const order = req.query.by.toLowerCase();
    let query = `SELECT * FROM videos ORDER BY vote `;

    if (order === "asc") query += "ASC";
    else query += "DESC";

    pool
      .query(query)
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }

  // if (req.query.by !== undefined) {
  //   const order = req.query.by.toLowerCase();
  //   if (order === "asc")
  //     res.json(videos.sort((x, y) => (x.vote > y.vote ? 1 : -1)));
  //   else res.json(videos.sort((x, y) => (x.vote < y.vote ? 1 : -1)));
  // }
});

app.delete("/:id", (req, res) => {
  //delete row by id
  const vidID = req.params.id;
  pool
    .query("DELETE FROM videos WHERE id = $1", [vidID])
    .then((result) => res.json({ message: `Video ID ${vidID} Deleted` }))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });

  // videos = videos.filter((e) => e.id != req.params.id);
  // save();
  // res.json({ message: "Video Deleted" });
});

app.put("/", (req, res) => {
  pool
    .query("UPDATE videos SET vote = $1, isvoted = $3 WHERE id = $2", [
      req.body.vote,
      req.body.id,
      req.body.isVoted,
    ])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// const save = () => {
//   fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
// };

//search based on video id and title

app.get("/:term", (req, res) => {
  const id = `%${req.params.term}%`;

  pool
    .query(`SELECT * FROM videos WHERE id::text LIKE $1 OR title LIKE $2`, [
      id,
      id,
    ])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
