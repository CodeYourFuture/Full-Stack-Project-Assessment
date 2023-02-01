const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();
const pool = new Pool({
  user: "db_videos_user",
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
