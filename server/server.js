const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");


app.use(cors());
const port = process.env.PORT || 5001;

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbConfig = {
  host: "ec2-54-228-95-1.eu-west-1.compute.amazonaws.com",
  port: "5432",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "d7093eigeicmho",
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(dbConfig)

app.listen(port, () => console.log(`Listening on port ${port}`));


//GET "/" => returns all of the videos
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) =>
      res
        .status(200)
        .header("Access-Control-Allow-Origin", "*")
        .json(result.rows)
    )
    .catch((error) => res.status(500).json(error));
  })


// POST "/" => add a video
app.post("/", (req, res) => {
  console.log(req.body)
  const videoTitle = req.body.title;
  const videoUrl = req.body.url;
  const videoRating = 0;
  const videoDate = new Date();

  if (videoTitle.length < 1) {
    res.status(400).json({
      result: "failure",
      msg: "A title is required.",
    });
  } else if (videoUrl.length < 1) {
    res.status(400).json({
      result: "failure",
      msg: "An url is required.",
    });
  }

  //validation url
  const isValidUrl = videoUrl.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );
  if (isValidUrl) {
    pool
      .query(
        `INSERT INTO videos (title, url, rating, date) VALUES($1, $2, $3, $4);`,
        [videoTitle, videoUrl, videoRating, videoDate]
      )
      .then(() =>
        res.json({
          msg: "Video has been successfully added.",
        })
      )
      .catch((error) => res.status(400).json({ msg: "Failed to add video." }));
  } else {
    res.status(500).json({ result: "failure", msg: "Invalid url"});
  }
});


//GET "/{ID}" => returns video with the ID contained within the {id} parameter
app.get("/:id", (req, res) => {
  const videoId =req.params.id;
  const query = 'SELECT * FROM videos WHERE id =$1;'
  
  if (!Number.isInteger(videoId)){
    return res.status(400).json({ msg: "Invalid input" });
  };

  pool
    .query(query, [customerId])
    .then((result) => {
      if (result.rows.length == 0){
        res.status(500).json({ msg: `No video with id ${videoId} has been found`})
      } else {
        res.json(result.rows);
      }
    })
    .catch((error) => res.status(500).json(error));

})


//Delete "/{id}" => Deletes the video with the ID container within the {id} parameter
app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  pool
    .query('SELECT * FROM videos WHERE id = $1', [videoId])
    .then((result) => {
      if (result.rows.length == 0){
        return res.status(500).json({result: "failure", msg: "Invalid video id"})
      }else{
        pool
          .query("DELETE FROM videos WHERE id=$1", [videoId])
          .then(() =>
            res
              .status(200)
              .json({ msg: `Video has been deleted` })
          )
          .catch((error) => res.status(500).json(error));
        }
    })
})