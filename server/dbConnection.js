const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "cyf",
  host: "localhost",
  port: 5432,
  database: "youtubevideos",
});

module.exports = pool;
