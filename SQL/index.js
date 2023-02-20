const express = require("express");
const app = express();

const { Pool } = require("pg");

const db = new Pool({
    host: "localhost",
    user: "tekre",
    password: "185606",
    database: "videos",
    port: 5432
});

const port = 6000 || process.env.PORT;
app.get('/', (req, res) => {
    res.json("hello this is the backend")
});
app.get("/videos", (req, res) => {
    db.query("select * from videos", (err, result) => {
        res.json(result.rows);
    });
});

app.post("/videos", (req, res) => {
    const query = "INSERT INTO videos (`id`,`title`,`url`,`rating`) VALUES(?)"
    const values = ["id from SQL", "title", "url", "rating"];
    db.query(query, [values], (err, data) => {
        res.json(data);
    })
})

app.listen(port, () => console.log(`Connected to backend ${port}`));