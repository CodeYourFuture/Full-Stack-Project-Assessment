const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  ssl: true,
});

db.connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

module.exports = db;