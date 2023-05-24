const { Pool } = require("pg");

const database = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  // This property controls whether or not to reject connections that are made to servers with self-signed or invalid SSL certificates. Set it to false to disable SSL/TLS verification.
  // Need this when connecting from a Local API to a Render PostgreSQL Database
  // REMOVE when the API is on Render
  ssl: {
    rejectUnauthorized: false,
  },
});

// Sanity Check on the Database Connection
database.connect((error, client, release) => {
  if (error) {
    return console.error("Error acquiring client", error.stack);
  }
  console.log("Successfully connected to the PostgreSQL database");
  client.release();
});

module.exports = database;
