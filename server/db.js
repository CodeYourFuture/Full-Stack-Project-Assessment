const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "postgres",
  connectionString:
    "postgresql://postgres:CYFStudent123@localhost:5432/video_lists",
  ssl: false,
});

module.exports = pool;
