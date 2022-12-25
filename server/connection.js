const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB
})

module.exports = pool;