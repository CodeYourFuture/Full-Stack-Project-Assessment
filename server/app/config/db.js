const fs = require("fs");
const { Pool } = require('pg');

const connectionString = 'postgres://uctaebxn:oudAX4SA7PGAK9xvC0sormh1aZ4jvUd1@tai.db.elephantsql.com/uctaebxn';

const pool = new Pool({
  connectionString: connectionString,
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
