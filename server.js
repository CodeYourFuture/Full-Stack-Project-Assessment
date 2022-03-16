const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("../exampleresponse.json");
const pool = new Pool({
  connectionString:
"postgres://fmuuxodppmzogp:946021991473acb23e256c12f7374d619f280bc12740a99d8d4435a8c969a4a2@ec2-34-250-92-138.eu-west-1.compute.amazonaws.com:5432/dfosgel6olppk3",  ssl: {
    rejectUnauthorized: false,
  },
  user: "fmuuxodppmzogp",
  host: "ec2-54-228-139-34.eu-west-1.compute.amazonaws.com",
  database: "dfosgel6olppk3",
  password: "946021991473acb23e256c12f7374d619f280bc12740a99d8d4435a8c969a4a2",
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
    // const rating
    const selectQuery = `SELECT * FROM fullstack_videos ORDER BY rating`;
    pool.query(selectQuery, (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).send(`msg: ${error}`);
      }
      res.send(result.rows);
      // res.send("test string")
    });
});

app.post("/", (req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const url = req.body.url;
  // const date
  // const time
  if(!title || !url ){
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
    return
  }
  const newVideo = {
    id: videos[videos.length -1].id +1,
    title: title,
    url: url,
    rating: 0
  };

  videos.push(newVideo);
  res.send( {id: newVideo.id} );
});

app.get("/:id", (req, res) => {
  const id = +req.params.id;
  const selectQuery =`SELECT from fullstack_videos WHERE id = ${id}`
  pool
    .query(selectQuery, (error, result) => {
      if (result.rows.length === 0) {
        return response.status(404).send({
          msg: `Video id: ${id} doesn't exist!`,
        })
    }
   })
  })
    



app.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = videos.findIndex((video) => video.id === id);
  if (index === -1) {
    return res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  videos.splice(index, 1);
  res.send({});
});

app.listen(port, () => console.log(`Listening on port: ${port}`));