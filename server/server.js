const express = require("express");
const app = express();
// added cors because client server fetch were showing blocking messaging and suggested cors()
const cors = require("cors"); 
const { Pool } = require("pg");

const port = process.env.PORT || 5001;
app.use(express.json());


const jsonData = require("../exampleresponse.json");

app.use(cors()); // added cors

const pool = new Pool({
  connectionString: 'postgres://asclrfmrxqizxi:a80c01766e14f9f22315dfece76f0de421229b0e60adb4eea53a59281c75a7fe@ec2-54-77-40-202.eu-west-1.compute.amazonaws.com:5432/d7i277ejcskkt3',
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "cyf_hotels",
//   password: "",
//   port: 5432,
// });

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = jsonData;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  // res.json(videos);
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// GET "/post"
app.post("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  const newVideo = req.body;

  if (!newVideo.title || !newVideo.url) {
    res.send({ result: "failure", message: "Video could not be saved" });
  } else {
   const query =
     "INSERT INTO videos (title,url,rating) VALUES ($1, $2, $3)";

   pool
     .query(query, [newVideo.title, newVideo.url, 0])
     .then(() => res.send("Video added!"))
     .catch((error) => {
       console.error(error);
       res.status(500).json(error);
     });
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
   pool
     .query("SELECT * FROM videos WHERE id=$1", [id])
     .then((result) => res.json(result.rows))
     .catch((error) => {
       console.error(error);
       res.status(500).json(error);
     });
  // const filterVideo = videos.filter((vid) => vid.id === id);
  // filterVideo.length === 0
  //   ? res.send("Video not found")
  //   : res.json(filterVideo[0]);
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query("DELETE FROM videos WHERE id=$1", [id])
    .then(() => res.send(`Video ${id} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
  // const filterVideo = videos.filter((vid) => vid.id === id);
  // if (filterVideo.length === 0) {
  //   res.json({
  //     result: "failure",
  //     message: "Video could not be deleted",
  //   });
  // }
  // const updateVidoes = videos.filter((vid) => vid.id !== id);
  // videos = updateVidoes;
  // res.json({});
});

// listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));