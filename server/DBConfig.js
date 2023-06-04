const {Pool}= require ("pg");

const db = new Pool({
  connectionString: process.env.db_url,
  ssl: { rejectUnauthorized: false }
});
videoList.connect();

module.export =db;
