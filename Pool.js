const { Pool } = require("pg");

require("dotenv").config();

const devConfig = {
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.PORT}`,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
