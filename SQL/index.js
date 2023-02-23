const cors = require('cors');

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

const port = 3030 || process.env.PORT;
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json("hello this is the backend")
});
app.get("/videos", (req, res) => {
    db.query("select * from videos", (err, result) => {
        res.json(result.rows);
    });
});

app.post('/videos', (req, res) => {

    // const { id, title, url, rating } = req.body;

    db.query("INSERT INTO videos (id, title, url, rating) VALUES ($1,$2,$3,$4)", [req.body.id, req.body.title, req.body.url, req.body.rating], (err, data) => {
        if (err) {
            throw err
        }
        res.status(201).send("Video has been added successfully");
    })
})





app.listen(port, () => console.log(`Connected to backend ${port}`));
