// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;
// const data = require("./exampleresponse.json");
// const cors = require("cors");
// app.use(express.json());
// app.use(cors());

// app.listen(port, () => console.log(`Listening on port ${port}`));

// // Store and retrieve your videos from here
// // If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// // URL validation check function
// const validationCheck = (url) => {
//   let regExp =
//     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
//   if (url.match(regExp)) {
//     return true;
//   }
//   return false;
// };

// // GET "/"
// app.get("/", (req, res) => {
//   res.send(data);
// });

// app.post("/", (req, res) => {
//   // let newArr = [];
//   // const maxId = data.map( e => newArr.push(e.id ));
//   // let id = Math.max(...newArr)+1;
//   // or the below one liner
//   let newId = Math.max(...data.map((e) => e.id));
//   newId = (newId < 0 ? 0 : newId) + 1;
//   console.log("new id", newId);
//   const { title, url } = req.body;
//   if (title && url) {
//     data.push({ id: newId, title, url });
//     return res.status(201).send({ id: newId });
//   } else {
//     return res.status(403).send({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//   }
// });

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   const filteredId = data.find((e) => e.id == id);
//   if (filteredId) res.send(filteredId);
//   return res.status(404).send(`Video with the id ${id} is not found`);
// });

// app.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const indexOfVideo = data.findIndex((e) => e.id == id);

//   if (indexOfVideo !== -1) {
//     data.splice(indexOfVideo, 1);
//     return res.status(200).send({});
//   }
//   return res.status(403).send({
//     result: "failure",
//     message: "Video could not be deleted",
//   });
// });

// app.put("/rating", (req, res) => {
//   const { id, rate } = req.body;
//   const newRate = data.filter((e) => e.id == id).map((e) => (e.rating = rate));
//   //console.log(newRate[0]);
//   res.status(200).send(newRate);
// });


// server.js when db is deployed on heroku

const express = require("express");
const app = express();
// const { Pool } = require("pg");
const port = process.env.PORT || 5000;
const { Client } = require("pg");



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false,
  },
});

client.connect();

app.use(express.json());



app.get("/", (req, res) => {
  client
    .query("Select * From videos")
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => res.status(500).json(error));
});

app.post("/", function (req, res) {
  const { title, url } = req.body;
  const queryString = `Insert Into videos (title, url) values ($1, $2)`;
  client
    .query(queryString, [title, url])
    .then((result) => res.status(200).send("Video added!"))
    .catch((error) => res.status(500).json(error));
});

app.put("/:videoId/rating", (req, res) => {
  const id = req.params.videoId;
  const rate = req.body.rating;
  const rating = videos;


  const queryString = `Update videos Set rating = $1 Where id = $2`;
  client
    .query(queryString, [rate, id])
    .then((result) => res.status(201).send("Rating has been updated!"))
    .catch((error) => res.status(500).json(error));
});


app.delete("/:videoId", (req, res) => {
  const id = req.params.videoId;
  const queryCheck = `Select * From videos where id = $1`;
  const queryString = `Delete From videos where id = $1`;
  client
    .query(queryCheck, [id])
    .then((result) => {
      if (result.rows.length == 0)
        res.status(404).send("Video does not exist!");
      else {
        pool
          .query(queryString, [id])
          .then((result) => res.status(200).send("Video has been deleted!"))
          .catch((error) => res.status(500).json(error));
      }
    })
    .catch((error) => res.status(500).json(error));
});

app.get("/videos/:videosId", function (req, res) {
  const videosId = req.params.hotelId;

  client
    .query("SELECT * FROM hotels WHERE id=$1", [videosId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});



app.listen(port, () => console.log(`Listening on port ${port}`));
