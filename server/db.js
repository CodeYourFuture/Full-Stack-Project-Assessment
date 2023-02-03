const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "postgres",
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:CYFStudent123@localhost:5432/video_lists",
  ssl: process.env.DATABASE_URL ? true : false,
});

module.exports = pool;
