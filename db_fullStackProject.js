const Pool = require("pg").Pool;

const pool = new Pool({
    user: "lzdavipstggugq",
    password: "405d1f40d64e06e7e5e63dc704c0affb2c231e983b840b2bf73c7bbfbf66af3b",
    host: "ec2-54-152-185-191.compute-1.amazonaws.com",
    post: 5432,
    database: "d4at2umff56pb7",
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// const pool = new Pool({
//     user: "postgres",
//     password: 1234,
//     host: "localhost",
//     post: 5432,
//     database: "db_fullStackProject"
// });

module.exports = pool;