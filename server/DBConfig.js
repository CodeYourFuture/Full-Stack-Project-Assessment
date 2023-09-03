const { Pool } = require("pg");
require("dotenv").config();
console.log(process.env.DBConfigLink);

const videosPool = new Pool({
  connectionString: process.env.DBConfigLink,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = videosPool;
