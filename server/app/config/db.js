const fs = require("fs");
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection established:', res.rows[0].now);
  }
});
module.exports = {
    query: (text, params) => pool.query(text, params),
  };
