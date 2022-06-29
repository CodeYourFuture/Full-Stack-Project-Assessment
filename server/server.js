const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
// const exampleresponse = require("./exampleresponse.json");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  user: "cyf",
  host: "localhost",
  database: "video_project",
  password: "cyfcyf",
  port: 5432,
});

app.get("/api", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("/api", (req, res) => {
//   res.json(exampleresponse);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Store and retrieve your videos from here
// let videos = exampleresponse;

// GET "/"

// app.get("/", (req, res) => {
//   res.json(videos);
// });

// GET "/video/Id"
app.get("/videos/:Id", (req, res) => {
  const findId = videos.find((video) => video.id == req.params.Id);
  res.json(findId);
});

// POST "/"
app.post("/", async (req, res) => {
  try {
    const { title, url, rating } = req.body;

    const insertQuery =
      "INSERT INTO videos (title, url,rating) VALUES ($1, $2, $3)";

    const addNewVideo = await pool.query(insertQuery, [title, url, rating]);
    res.json(addNewVideo);

    // .then(() => res.send("video successfully uploaded"))
    // .catch(() => {
    //   const error = {
    //     result: "failure",
    //     msg: "video couldn't be added",
    //   };
    //   res.json(error);
    // });
  } catch (err) {
    console.error(err.message);
  }
});

// newVideoId = videos.length + 1;

// const addNewVideo = {
//   id: newVideoId,
//   title: req.body.title,
//   url: req.body.url,
//   rating: 0,
// };

// videos.push(addNewVideo);
// res.send(videos);

// DELETE "/"

app.delete("/videos/:id", function (req, res) {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM videos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
});

// app.delete("/videos/:Id", (req, res) => {
//   const findId = videos.find((video) => video.id == req.params.Id);
//   const findWhereId = videos.findIndex((video) => video.id == req.params.Id);
//   videos.splice(findWhereId, 1);

//   if (findId) {
//     res.send(`Message with id:${findId.id} has been deleted`);
//   } else {
//     res.json({
//       result: "failure",
//       message: "Video could not be deleted",
//     });
//   }
// });

// Manipulates the video rating
// app.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { vote } = req.query;

//   pool.query(
//     `UPDATE videos SET rating = (SELECT rating FROM videos WHERE id  = $1) ${
//       vote === "up" ? "+ 1" : "- 1"
//     } WHERE id = $1`,
//     [id]
//   );

//   res.send({});
// });
