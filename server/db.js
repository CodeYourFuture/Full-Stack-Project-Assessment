const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DBConnLink,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;