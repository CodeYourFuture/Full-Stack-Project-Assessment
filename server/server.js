const express = require("express");
const Pool = require("pg").Pool;

const MAX_RETRIES = 5;

const getDbPool = (retries) => {
  if (retries > 0) {
    try {
      return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
    } catch {
      return getDbPool(retries - 1);
    }
  }
};

const pool = getDbPool(MAX_RETRIES);

const app = express();
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (_req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/db-health" - this is probably NOT a good idea for your actual app, but you can use it to check that you are able to connect to the database
// Delete this endpoint after you've confirmed you are able to connect to the database
app.get("/db-health", (_req, res) => {
  pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
    (err, _response) => {
      if (err) {
        res.status(500).send();
      }
      res.send({ postgres: "DB connection succeeded" });
    }
  );
});

module.exports = app;
