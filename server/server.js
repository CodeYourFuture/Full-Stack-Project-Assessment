const express = require("express");
const app = express();
// const cors = require("cors");
// const pool = require("./db_fullStackProject");
// const uuid = require("uuid");
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});


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









app.listen(port, () => console.log(`Listening on port ${port}`));