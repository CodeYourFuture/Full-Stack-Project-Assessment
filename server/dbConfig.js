const { Pool } = require("pg");

const database = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  }
});

// database.connect(() => {
//     console.log("Connected to the PostgreSQL database...");
// })

module.exports = database;