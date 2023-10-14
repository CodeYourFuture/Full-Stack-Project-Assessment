const { Client } = require("pg");

async function getPostgresClient() {
  const client = new Client({
   connectionString: process.env.URI,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect()
  return client
}

module.exports = getPostgresClient;
