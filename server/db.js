const Pool = require('pg').Pool;

const pool = new Pool({
   user:'postgres',
   password:'video123',
   host:'localhost',
   port:5432,
   database:'pernvideo'

});

module.exports = pool;