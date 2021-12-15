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
    "postgres://ldrpixfmeztwlo:9b4bcd97ab74ad228f1d136f9b733c627650b25c6c26deb1d755da98f9cb5db1@ec2-54-229-68-88.eu-west-1.compute.amazonaws.com:5432/d81o2tq6p6a4ir",
  ssl: {
    rejectUnauthorized: false,
  },
  user: "ldrpixfmeztwlo",
  host: "ec2-54-228-139-34.eu-west-1.compute.amazonaws.com",
  database: "dapnscot6ihjdt",
  password: "",
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
  const selectQuery = `SELECT * FROM fullstack_videos ORDER BY rating`;
  pool
    .query(selectQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(`msg: ${error}`);
      }
      res.send(result.rows);
    });
});

app.post("/", (req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const url = req.body.url;
 
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