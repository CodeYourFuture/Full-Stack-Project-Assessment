require("dotenv").config();
const config = require("config");
const { Pool } = require("pg");

const pool = new Pool({
    host: config.get("db.host"),
    port: config.get("db.port"),
    user: config.get("db.user"),
    password: config.get("db.password"),
    database: config.get("db.database")
});

module.exports = pool;