require("dotenv").config();
const {Pool, Client} = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

const pool = new Pool({
  user: process.env.SQL_USERNAME,
  host: "localhost",
  database: "project_videos",
  password: process.env.SQL_PASSWORD,
  port: 5432,
});

module.exports = pool;
