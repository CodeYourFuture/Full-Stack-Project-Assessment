const { Pool } = require("pg");

const videosPool = new Pool({
  connectionString: process.env.DBConnLink,
});

module.exports = videosPool;