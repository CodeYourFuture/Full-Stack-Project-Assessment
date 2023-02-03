const Pool = require("pg").Pool;
const dotenv = require(".env");
dotenv.config();

const pool = new Pool({
  user: "postgres",
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
