const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_videos",
  password: "101",
  port: 5432,
});

module.exports = pool;
