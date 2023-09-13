const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

const client = new Client({
  host: process.env.MYHOST,
  user: process.env.MYUSER,
  port: process.env.MYPORT,
  password: process.env.MYPASSWORD,
  database: process.env.MYDATABASE,
  ssl: true,
});

client.connect(function (error) {
  if (error) {
    throw error;
  }
  console.log("connected to database");
});



// GET "/"
app.get("/", (req, res) => {
  client.query("SELECT * FROM youtubevideos ORDER BY title",(error,result)=>{
    if (!error){
      res.json(result.rows);
    }
    else {
      console.log(error.message);
    }
    })
     client.end;
});
// POST
app.post("/", (req, res) => {
 const{title,url} = req.body;
client.query("INSERT INTO youtubevideos (title, url, rating) VALUES ($1, $2, 0)", 
[title,url],
(error,result)=>{
    if (!error){
      res.status(201).send("Success");
    }
    else {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }
    })
    
});

  app.delete("/:id", (req, res) => {
    const idFormInput = parseInt(req.params.id);
    client.query("DELETE FROM youtubevideos  WHERE id=($1)", [idFormInput],
    (error,result)=>{
      if (!error){
        res.status(201).send("Success");
      }
      else {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
      }
      })})
    

    app.put("/:id", (req, res) => {
      const idFormInput = parseInt(req.params.id);
      let myRating = Number(req.body.video.rating);
      client.query("UPDATE youtubevideos SET rating=($2) WHERE id=($1)", [
        idFormInput,
        myRating
      ],
      (error,result)=>{
        if (!error){
          res.status(201).send("Success");
        }
        else {
          console.log(error.message);
          res.status(500).send("Internal Server Error")
        }
        })
      });