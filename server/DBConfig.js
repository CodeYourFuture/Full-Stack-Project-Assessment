const { Pool } = require("pg");
const videosPool = new Pool({
    user:'postgres',
    host:'videosdb.cf4a0ma6uvcb.eu-north-1.rds.amazonaws.com',
    database:'postgres',
    password:'admin12345',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }

});
module.exports = videosPool;
