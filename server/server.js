const { response, request } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// to generate unique id (npm i uuid) source express crash course traversy media
const uuid = require("uuid");
// body parser middleware
// body parser middleware. The urlencoded method within body-parser tells body-parser to extract data from the <form> </form> element and add them to the body property in the request object.
app.use(express.json());
app.use(cors());
//node js

// Using body-parser allows you to access req.body from within routes and use that data.
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

const db = new Pool({
  user: "postgres", // replace with you username
  host: "localhost",
  database: "cyf_videodata",
  password: "zision",
  port: 5432,
});

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// const videos = require("../client/src/data/exampleresponse.json");

// GET "/" method
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.status(200).json( videos );
// });

app.get("/", function (req, res) {
  //    console.log(res.send("hello"))
  db.query("SELECT * FROM videodata", (error, result) => {
    //  console.log(result)
    res.json(result.rows);
  });
});

// post method to include all data from videos example provided by cyf

// app.post("/", function (request, response) {
//   const newId = request.body.id;
//   const newTitle = request.body.title;
//   const newUrl = request.body.url;
 

//   const query =
//     "INSERT INTO videodata (id, title, url, rating) " +
//     "VALUES ($1, $2, $3, $4)";

//   db.query(query, [newId, newTitle, newUrl, newRating], (err) => {
//     response.send(" Video created.");
//   });
//   // console.log(response)
// });

// task-POST mehtod
// This endpoint is used to add a video to the API.

// Both fields - title and url - must be included and be valid for this to succeed.

// **Note:** When a video is added, you must attach a unique ID to so that it can later be deleted
app.post("/", function (request, response) {
  const failureObject = {
    result: "failure",
    message: "Video could not be saved",
  };

 const newId = request.body.id;
  const newTitle = request.body.title;
  const newUrl = request.body.url;
   const newRating = request.body.rating;
  

  if (!newTitle || !newUrl ) {
    response.status(400).json({ failureObject });
  } else {
    const query =
      "INSERT INTO videodata (id, title, url, rating) VALUES ($1, $2, $3, $4)";
    db.query(query, [ 0, newTitle, newUrl, 0], (err, results) => {
      if (err) {
        // throw error;
        console.error(err);
        return response.status(500).send("Error creating video");
      }
      response.status(200).send("New Video Created.");
    });
  }
});

// Task -search by id
// Returns the video with the ID contained within the `{id}` parameter

app.get("/:id", function (request, response) {
  const foundVideo =  parseInt(request.params.id)
  const failureObject = {
    result: `failure`,
    message: `Invalid video id`,
  };
 db.query("SELECT * FROM videodata WHERE id = $1", [foundVideo], (err, result) => {
  if(err){
    console.error(err)
    return response.status(500).send({failureObject})
  } 
  response.json(result.rows);
 });
});

// task -DELETE  method
// Deletes the video with the ID container within the `{id}` parameter

app.delete("/:id", function (request, response) {
  
  const failureObject = {
    result: `failure`,
    message: `Video could not be deleted`,
  };

  const foundVideo = parseInt(request.params.id);


  

    const query = "DELETE FROM videodata WHERE id=$1";
    db.query(query, [foundVideo], (err, results) => {
      if (err) {
        console.error(err);
        return response.status(500).send({ failureObject });
      }
      response.status(200).send(`Video ${foundVideo} deleted `);
    });
  });

