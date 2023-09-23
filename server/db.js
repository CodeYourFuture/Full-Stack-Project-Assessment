const fs = require("fs");
const { Pool } = require('pg');

const Value = "postgres://mqkrztoq:Q6tnH2B1iVQpFmM2MGHhMoYewJ4zl_By@lallah.db.elephantsql.com/mqkrztoq"

const pool = new Pool({
  connectionString: Value,
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