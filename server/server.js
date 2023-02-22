const express = require("express");
const app = express();
// const videos = require("./exampleresponse.json");
const { Pool } = require("pg");

const port = 5000;
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1",
  database: "videos_list_project",
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
 

//  level200-start
app.get("/videos", (req, res) => { 
  //  level299-Ordered Data - Back End/start 
  pool.query("SELECT * FROM videos", (error, result) => {
    res.json(result.rows);
  }); 
});

// for convert string to number add + before request
app.get("/videos/:id", (req, res) => {
  const newId =+ req.params.id; 
    pool
      .query("SELECT * FROM videos WHERE id = " + newId )
      .then((result) => {
        if ( result.rows.length > 0) {
          res.status(200).json(result.rows);
        } else {
          res.status(200).json({ result: "not Found" });
        } 
      })
      .catch((error) => res.status(500).json(error)); 
});

// insert into the database
app.post("/videos", function (req, res) {
  const { title, url } = req.body;
  if (title && url) {
    pool.query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)",
      [title, url ],
      (error, results) => {
        if (error) {
          throw error;
        }else{
          res.status(204).json({result:"created"})
        }
      }
    );
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});


// delete from database
app.delete("/videos/:id", (req, res) => {
  const newId = +req.params.id;
  pool.query("DELETE FROM videos WHERE id = $1", [newId], (error, results) => {
    if (error) {
      res.status(404).json({
        result: "failure",
        message: "Video could not be deleted",
      });
      throw error;
    }
  });
});
