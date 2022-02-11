
const { Pool } = require("pg");
const data = require("./exampleresponse.json");

const pool = new Pool({
    user: "elmira",
    host: "localhost",
    database: "itube",
    password: "V@seubunto123",
    port: 5432
})

data.forEach(video => {
    pool.query(`INSERT INTO videos(title,url,rating) VALUES($1,$2,$3)`, [video.title, video.url, video.rating])
        .then(() => console.log("successfully inserted"))
})