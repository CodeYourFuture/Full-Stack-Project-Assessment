const Pool = require("pg").Pool;

const pool = new Pool({
  user: "videos",
  host: "localhost",
  database: "cyf_videos",
  password: "6580",
  port: 5432,
});
module.exports = pool;
