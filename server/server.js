const express = require("express");
const app = express();
app.use(express.json());
const { Pool } = require("pg");
require("dotenv").config();

// dotenv.config()


const cors = require('cors');
const {rows} = require("pg/lib/defaults");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_URL,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });

app.use(cors({
        origin: 'http://localhost:3000',
    }
));

app.get("/videos", (req, res) => {
    const query = 'SELECT * FROM videos';
    pool.query(query)
        .then(result => {
            res.status(200).json(result.rows);
        })
        .catch(error => {
            throw error;
        });
})

app.post("/videos", (req, res) => {
    const {title,url,rating} = req.body;
    const query = 'INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)';
    const values = [title, url, rating];
    pool.query
    (query, values)
        .then(result => {
            res.status(201).json({message: 'Video created'});
        })
        .catch(error => {
            throw error;

        }
    );
})

//changing the rating of a video
app.put("/videos/:id", (req, res) => {
    let id = req.params.id;
    const {rating} = req.body;
    const query = 'UPDATE videos SET rating = $1 WHERE id = $2';
    const values = [rating, id];
    pool.query
    (query, values)
        .then(result => {
            res.status(201).json({message: 'Video updated'});
        }
    )
        .catch(error => {
            throw error;
        }
    );
})

//deleting a video
app.delete("/videos/:id", (req, res) => {
    let id = req.params.id;
    const query = 'DELETE FROM videos WHERE id = $1';
    const values = [id];
    pool.query
    (query, values)
        .then(result => {
            res.status(201).json({message: 'Video deleted'});

        }
    )
        .catch(error => {
            throw error;

        })

})

app.listen(3001, () => {
    console.log("Server is listening on port 3001",process.env.DATABASE_URL)
});