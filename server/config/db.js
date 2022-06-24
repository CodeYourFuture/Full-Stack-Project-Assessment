require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.SQL_USERNAME,
  host: "localhost",
  database: "project_videos",
  password: process.env.SQL_PASSWORD,
  port: 5432,
});

module.exports = pool;
