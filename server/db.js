const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  connectionString: process.env.DBConfigLink,
  ssl: false,
});

// const pool = new Pool({
//   connectionString: process.env.DBConfigLink,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

module.exports = pool;