const { Client } = require("pg");

function getPostgresClient() {
  // return new Client({
  //   host: "localhost",
  //   database: "videos",
  //   port: 5432,
  //   user: "postgres",
  //   password: process.env.PASSWORD,
  // });
  return new Client({
   connectionString: process.env.URI,
    ssl: { rejectUnauthorized: false }
  });
}

module.exports = getPostgresClient;
