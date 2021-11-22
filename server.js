const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_fullStackProject");
const uuid = require("uuid");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });


// /GET data from database
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos", (db_err, db_res) => {
    if (db_err) {
      res.send(JSON.stringify(db_err));
    } else {
      res.json(db_res.rows);
    }
  })
});

// Delete a video from database
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM videos WHERE id=$1', [id], (db_err, db_res) => {
    if (db_res.rows.length > 0) {
      pool.query('DELETE FROM videos WHERE id=$1', [id], (db_err, db_res) => {
        if (db_err) {
          res.status(500).send(JSON.stringify(db_err.message));
        } else {
          res.json(db_res.rows);
        }
      })
    } else {
      res.status(400).send("The id you want to delete is not present")
    }
  })
});



// Create a new video in the database
app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = req.body.rating

  pool
    .query('SELECT * FROM videos WHERE url=$1', [newUrl])
    .then((result => {
      if (result.rows.length > 0) {
        return res.status(400).send("This url already exists!")
      } else {
        const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
        pool
          .query(query, [newTitle, newUrl, newRating])
          .then(() => res.send("New video created!"))
          .catch((e) => console.log(e))
      }
    }));
});




app.listen(port, () => console.log(`Listening on port ${port}`));