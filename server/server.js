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
  connectionString: process.env.DATABASE_URL,
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

   pool.query(
     query,
     [newVideo.title, newVideo.url,0
  ],
     (error, results) => {
       if (error) {
         throw error;
       }
       console.log(results.rows)
       res.status(200).send(results.rows[0]);
     }
   );
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