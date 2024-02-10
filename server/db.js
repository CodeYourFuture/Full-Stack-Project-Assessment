const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "tsioneta",
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = pool;
