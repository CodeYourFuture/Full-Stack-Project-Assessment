const express = require("express");
let cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../client/src/exampleresponse.json");

let connection = mysql.createConnection({
  host: 'localhost',
  database: 'sys',
  user: 'root',
  password: '',
  port: 3306
});

//let result;



let fail = {
  "result": "failure",
  "message": "Video could not be saved"
};

// GET "/"
app.get("/", (req, res) =>
{
  let sorted = req.query.order;

  if (sorted === "asc")
  {
    connection.query('SELECT * FROM videos', (err, rows) =>
    {
      let result = Object.values(JSON.parse(JSON.stringify(rows)));
      result = [...result].sort((a, b) => a.rating - b.rating);
      res.send(result)
    });
    /*
    videos = [...videos].sort((a, b) => a.rating - b.rating);
    console.log(videos)
    res.send(videos);*/
  }

  else if (sorted === "desc")
  {
    connection.query('SELECT * FROM videos', (err, rows) =>
    {
      result = Object.values(JSON.parse(JSON.stringify(rows)));
      result = [...result].sort((a, b) => b.rating - a.rating);
      res.send(result)
    });
    /*
    videos = [...videos].sort((a, b) => b.rating - a.rating);
    console.log(videos)
    res.send(videos);
    */
  }

  else
  {
    res.send(videos);
  }

});

app.post("/", (req, res) =>
{
  const video = {
    id: req.body.id,
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
    added: req.body.added
  };

  if (typeof req.body.title !== "string" || typeof req.body.url !== "string")
  {
    res.status(400).send(fail);
  }


  else
  {
    connection.connect(function (err)
    {
      let sql = `INSERT INTO videos 
      (
          id, title, url, rating
      )
      VALUES
      (
          ?, ?, ?, ?
      )`;
      connection.query(sql, [req.body.id, req.body.title, req.body.url, req.body.rating], (err, rows) =>
      {
        result = Object.values(JSON.parse(JSON.stringify(rows)));
      });
    });
    /*
    videos.push(video);
    res.status(200).json(result);
    */
  }
});

app.get("/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  let filteredVideo = videos.filter(video => video.id === id);

  res.send(filteredVideo);
});

app.delete("/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  //let filterdVideo = videos.filter(video => video.id === id);
  let sql = `DELETE FROM videos WHERE id = ` + id;
  console.log(sql)
  connection.query(sql, (err, rows) =>
  {
    result = Object.values(JSON.parse(JSON.stringify(rows)));
    console.log(result);
    res.send(result)
  });

  /*
  if (filterdVideo.length !== 0)
  {
    console.log(filterdVideo)


    videos = videos.filter(video => video.id !== id);
    res.send(videos);

  }

  else
  {
    res.send(fail);
  }
  */
});
