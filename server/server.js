// libraries
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'chris_user',
    host: 'dpg-cg3l8ql269v3bpb833b0-a.oregon-postgres.render.com',
    database: 'chris_koetzee',
    password: 'IwGFGXhLzoCFztiJVwFj4gP7xffAo4ht',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// End Points
// 1. Getting all the videos saved
app.get("/", (req, res) => {
  pool.query('SELECT * FROM videos')
      .then((result) => res.json(result.rows))
      .catch((error) => {
          console.error(error);
          res.status(500).json(error);
      });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"

