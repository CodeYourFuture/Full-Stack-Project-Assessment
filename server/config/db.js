const {Pool} = require("pg");
const fs = require("fs");


const URL = "postgres://hlhsmhxi:rDPeP6iKy52dfIhiwx8QxZQtvD-V8DLe@tai.db.elephantsql.com/hlhsmhxi"
const pool = new Pool({
    connectionString: URL,
})


pool.query('SELECT ALL', (error, res) => {
    if (error) {
        console.error("There's an error sug-rrr", error)
    }
   else {
    console.log("Nice sug-rrr ;)", res.rows[0].now)
   }
}
)

module.exports = {
    query: (text, params) => pool.query(text, params),
  };
