const Pool = require("pg").Pool;
const dotenv = require("dotevn");
dotenv.config();

const pool = new Pool ({  
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  user: 'dewayne',
});    


module.exports = pool;