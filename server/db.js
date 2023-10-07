const { Pool } = require('pg');

link = "postgres://vtsohdxm:jNSKq4-96QSdfZax4qdrprDhVwu-rcrF@surus.db.elephantsql.com/vtsohdxm"

const pool = new Pool({
    connectionString: link,
    ssl:{
        rejectUnauthorized: false
    }
});


  module.exports = {
    query: (text, params) => pool.query(text, params),
};
