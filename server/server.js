const express = require("express");
const { Pool } = require("pg");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

let videos = [];

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_hotels",
  password: "youtuberfarzad@7633",
  port: process.env.PORTS,
});
//root
app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/hotels/:id", function (req, res) {
  const id = req.params.id;
  pool
    .query("SELECT * FROM clients WHERE id = $1",[id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
