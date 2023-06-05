const { Pool } = require('pg');
const itemsPool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = itemsPool;
