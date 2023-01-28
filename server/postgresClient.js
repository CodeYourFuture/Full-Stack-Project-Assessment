const { Client } = require("pg");

 function getPostgresClient() {
  return new Client({
    host: "localhost",
    database: "video",
    port: 5432,
    user: "postgres",
    password: "",
  });
}

module.exports = getPostgresClient
