const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_CONFIG_LINK,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;
