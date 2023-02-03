const express = require("express");
const app = express();
app.use(express.json());
const {Pool} = require("pg");


const cors = require('cors');
const {rows} = require("pg/lib/defaults");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "videos",
    password: "",
    port: 5432,
});

app.use(cors({
        origin: 'http://localhost:3000',
    }
));

app.listen(5000, () => console.log(`Listening on port ${5000}`));

app.get('/videos', (req, res) => {
    const query = 'SELECT * FROM videos' 
    pool.query(query) .then(result => {
        res.status(200).json(result.rows)

    }).catch(error => {
        throw error 
    })
})