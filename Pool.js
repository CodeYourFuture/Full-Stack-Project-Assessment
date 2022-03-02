require("dotenv").config();

const { Pool } = require("pg");

const devConfig = {
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.PORT}`,
};

const proConfig = {
  client: "pg",
  connectionString: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tablename: "videos",
    directoty: "./migrations",
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
