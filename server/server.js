const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./data/exampleresponse.json");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = new Pool({
  user: "kmona", 
  host: "localhost",
  database: "cyf_videos",
  password: process.env.db_password,
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
  db.query("SELECT * FROM videos", (error, result) => {
    res.json(result.rows);
  });
});
//post add new videos
app.post("/",  (req, res)  => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = req.body.rating;
  try {
    const query =  "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
      db.query(query, [newTitle, newUrl, newRating])
      .then(() => res.send("add video !"))
  } catch (error) {
    res.status(500).json(">>>>",error);
  }
  
});
//get video by id
app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    db.query(
      `SELECT * FROM videos
       Where id=${id}
    `,
      (error, result) => {
        if(result){
          res.json(result.rows);
        } else {
          console.error(error)
          res.status(500).json(error)
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
// delete video
app.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
   await db.query("DELETE FROM videos WHERE id=$1", [id])
        .then(() => res.send(`video ${id} deleted!`))
        .catch((e) => console.error(e));

});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
