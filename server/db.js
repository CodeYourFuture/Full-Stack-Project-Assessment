const Pool = require("pg").Pool;
require("dotenv").config();
const ssl = process.env.DEV ? false : true;
const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  ssl: ssl,
  database: "videosapp",
});

module.exports = pool;
