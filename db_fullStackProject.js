
const Pool = require("pg").Pool;

 const pool = new Pool({
     user: "postgres",
     password: 1234,
     host: "localhost",
     post: 5432,
     database: "fullStackProject"
 });

module.exports = pool;